import { invalidateSession, isCurrentSession } from '@apis/auth/sessionActions';
import { getNewToken } from '@apis/user/getNewToken';
import axios from 'axios';
import useAuthStore from '@stores/authStore';
import { HTTPError } from '@apis/HTTPError';
import { NetworkError } from '@apis/NetworkError';
import { SESSION_INVALID_CODES } from '@constants/api';
import type { AuthUnavailableReason, TokenRefreshResult } from '@type/auth';

const TOKEN_REFRESH_RETRY_DELAY = 500;

let refreshPromise: Promise<TokenRefreshResult> | null = null;

/**
 * 토큰 재발급 요청을 다시 시도해도 되는 오류인지 확인한다.
 * 네트워크 오류와 HTTP 5xx만 다시 시도한다.
 *
 * @param error 토큰 재발급 요청에서 발생한 오류
 * @returns 요청을 다시 시도할 수 있으면 true
 */
const shouldRetryTokenRefresh = (error: HTTPError | NetworkError) =>
	error instanceof NetworkError || (error instanceof HTTPError && error.status >= 500);

/**
 * 연속 요청 사이에 간격을 두기 위해 지정된 시간만큼 기다린다.
 *
 * @param delay 대기 시간(ms)
 * @returns 대기가 끝났음을 알리는 Promise
 */
const waitForRefreshRetry = (delay: number) =>
	new Promise<void>((resolve) => {
		window.setTimeout(resolve, delay);
	});

/**
 * 토큰 재발급 오류에서 인증 복구 화면에 필요한 정보만 추린다.
 *
 * @param error 재시도 후에도 남은 최종 오류
 * @returns 인증 스토어에 저장할 토큰 재발급 실패 원인
 */
const convertToUnavailableReason = (error: HTTPError | NetworkError): AuthUnavailableReason => {
	if (error instanceof NetworkError) return { type: 'network' };

	const reason = { status: error.status, code: error.code };

	return error.status >= 500 ? { type: 'server', ...reason } : { type: 'client', ...reason };
};

/**
 * 새 액세스 토큰을 요청한다.
 * 네트워크 오류 또는 HTTP 5xx가 발생하면 일정 시간 후 한 차례 더 요청한다.
 * 재시도 전에 세션이 바뀌면 요청을 취소한다.
 *
 * @param sessionVersion 토큰 재발급을 시작한 세션 버전
 * @returns 새 액세스 토큰 정보
 * @throws 요청이 취소됐거나 세션이 바뀌었거나 토큰 재발급이 최종 실패한 경우
 */
const requestNewAccessToken = async (sessionVersion: number) => {
	try {
		return await getNewToken();
	} catch (error) {
		if (axios.isCancel(error) || !isCurrentSession(sessionVersion)) {
			throw new axios.CanceledError();
		}

		if (!(error instanceof HTTPError || error instanceof NetworkError)) throw error;

		if (!shouldRetryTokenRefresh(error)) throw error;

		await waitForRefreshRetry(TOKEN_REFRESH_RETRY_DELAY);

		if (!isCurrentSession(sessionVersion)) throw new axios.CanceledError();

		return getNewToken();
	}
};

/**
 * 토큰 재발급 오류를 취소, 세션 무효, 재발급 불가 중 하나로 확정한다.
 * 인증 상태를 변경하고 예상하지 못한 오류는 다시 던진다.
 *
 * @param error 토큰 재발급 중 발생한 오류
 * @param sessionVersion 토큰 재발급을 시작한 세션 버전
 * @returns 분류를 마친 토큰 재발급 실패 결과
 * @throws 예상하지 못한 프로그래밍 오류
 */
const handleRefreshError = (error: unknown, sessionVersion: number): TokenRefreshResult => {
	if (axios.isCancel(error) || !isCurrentSession(sessionVersion)) {
		return { type: 'canceled' };
	}

	if (!(error instanceof HTTPError || error instanceof NetworkError)) throw error;

	if (
		error instanceof HTTPError &&
		error.code !== undefined &&
		SESSION_INVALID_CODES.has(error.code)
	) {
		invalidateSession(error.code, sessionVersion);
		return { type: 'invalid-session' };
	}

	const unavailableReason = convertToUnavailableReason(error);

	useAuthStore.getState().setSessionUnavailable(unavailableReason);

	return { type: 'unavailable', error };
};

/**
 * 토큰 재발급을 수행하고 결과를 `TokenRefreshResult`로 확정한다.
 * 성공 응답은 세션 버전을 확인한 뒤 인증 스토어에 저장하며, 세션이 다르면 폐기한다.
 * 요청 중 발생한 오류는 `handleRefreshError`에 전달해 인증 상태와 실패 결과를 결정한다.
 *
 * @param sessionVersion 토큰 재발급을 시작한 세션 버전
 * @returns 성공, 세션 무효, 재발급 불가 또는 취소 결과
 * @throws 예상하지 못한 프로그래밍 오류
 */
const processTokenRefresh = async (sessionVersion: number): Promise<TokenRefreshResult> => {
	try {
		const { accessToken } = await requestNewAccessToken(sessionVersion);

		if (!isCurrentSession(sessionVersion)) return { type: 'canceled' };

		useAuthStore.getState().updateSession(accessToken);

		return { type: 'success', accessToken };
	} catch (error) {
		const refreshFailureResult = handleRefreshError(error, sessionVersion);

		return refreshFailureResult;
	}
};

/**
 * 진행 중인 토큰 재발급이 있으면 새 요청을 만들지 않고 기존 Promise를 반환한다.
 * 진행 중인 작업이 없으면 현재 세션을 기준으로 새 토큰 재발급을 시작한다.
 *
 * @returns 진행 중이거나 새로 시작한 토큰 재발급 Promise
 * @throws 예상하지 못한 프로그래밍 오류
 */
export const refreshAccessToken = (): Promise<TokenRefreshResult> => {
	if (refreshPromise) return refreshPromise;

	const { sessionVersion } = useAuthStore.getState();

	refreshPromise = processTokenRefresh(sessionVersion).finally(() => {
		refreshPromise = null;
	});

	return refreshPromise;
};

/**
 * Axios 요청의 Authorization 헤더에 넣을 액세스 토큰을 가져온다.
 * 토큰을 가져오는 동안 세션이 바뀌거나 재발급에 실패하면 CanceledError를 던진다
 *
 * @param sessionVersion Axios 요청을 시작할 때 기록한 세션 버전
 * @returns 현재 세션에서 사용할 액세스 토큰
 * @throws 세션이 바뀌거나 알려진 재발급 오류가 발생한 경우 CanceledError
 * @throws 토큰 재발급 중 발생한 예상하지 못한 오류
 */
export const resolveAccessTokenForRequest = async (sessionVersion: number): Promise<string> => {
	if (!isCurrentSession(sessionVersion)) throw new axios.CanceledError();

	const { status, accessToken } = useAuthStore.getState();

	if (status === 'guest' || status === 'unavailable') throw new axios.CanceledError();

	if (!refreshPromise && accessToken) return accessToken;

	const refreshResult = await refreshAccessToken();

	if (!isCurrentSession(sessionVersion) || refreshResult.type !== 'success') {
		throw new axios.CanceledError();
	}

	return refreshResult.accessToken;
};
