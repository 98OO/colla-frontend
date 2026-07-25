import { getNewToken } from '@apis/user/getNewToken';
import { queryClient } from '@hooks/queries/common/queryClient';
import axios from 'axios';
import useAuthStore from '@stores/authStore';
import { HTTPError } from '@apis/HTTPError';
import { ABNORMAL_TOKEN_CODES, SESSION_INVALID_CODES } from '@constants/api';
import { AUTH_RESTORE_DISABLED_KEY } from '@constants/storage';

let refreshPromise: Promise<string> | null = null;

export const clearClientSession = () => {
	useAuthStore.getState().clearSession();
	queryClient.removeQueries({ queryKey: ['userStatus'] });
};

export const invalidateSession = (code: number) => {
	if (ABNORMAL_TOKEN_CODES.has(code)) {
		// eslint-disable-next-line no-console
		console.warn(`비정상적인 토큰 오류가 발생했습니다 (code: ${code})`);
	}

	clearClientSession();
};

export const refreshAccessToken = () => {
	if (!refreshPromise) {
		const version = useAuthStore.getState().sessionVersion;

		refreshPromise = getNewToken()
			.then(({ accessToken }) => {
				if (useAuthStore.getState().sessionVersion !== version) {
					throw new axios.CanceledError();
				}

				useAuthStore.getState().updateSession(accessToken);
				return accessToken;
			})
			.catch((error) => {
				if (
					error instanceof HTTPError &&
					error.code !== undefined &&
					SESSION_INVALID_CODES.has(error.code)
				) {
					invalidateSession(error.code);
				}

				throw error;
			})
			.finally(() => {
				refreshPromise = null;
			});
	}

	return refreshPromise;
};

export const getPendingRefreshPromise = () => refreshPromise;

const shouldSkipSessionRestore = () => {
	if (window.localStorage.getItem(AUTH_RESTORE_DISABLED_KEY) !== 'true') return false;

	if (useAuthStore.getState().status !== 'guest') clearClientSession();

	return true;
};

export const restoreSession = async () => {
	if (shouldSkipSessionRestore()) return;

	try {
		await refreshAccessToken();
	} catch (error) {
		if (axios.isCancel(error)) return;

		// refreshAccessToken 내부 catch에서 guest로 확정한 상태
		if (useAuthStore.getState().status !== 'loading') return;

		// 일시적 오류(500번대 · 네트워크) 1회 재시도
		try {
			await refreshAccessToken();
		} catch (retryError) {
			if (axios.isCancel(retryError)) return;

			// 재시도도 실패(guest로 확정되지 않음) → error로 확정
			if (useAuthStore.getState().status === 'loading') {
				useAuthStore.getState().setSessionError();
			}
		}
	}
};

export const signIn = (accessToken: string) => {
	window.localStorage.removeItem(AUTH_RESTORE_DISABLED_KEY);
	useAuthStore.getState().initializeSession(accessToken);
};

export const signOut = () => {
	window.localStorage.setItem(AUTH_RESTORE_DISABLED_KEY, 'true');
	clearClientSession();
};
