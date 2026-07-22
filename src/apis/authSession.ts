import { getNewToken } from '@apis/user/getNewToken';
import { queryClient } from '@hooks/queries/common/queryClient';
import useAuthStore from '@stores/authStore';
import { HTTPError } from '@apis/HTTPError';
import { ABNORMAL_TOKEN_CODES, SESSION_INVALID_CODES } from '@constants/api';

let refreshPromise: Promise<string> | null = null;

export const invalidateSession = (code: number) => {
	if (ABNORMAL_TOKEN_CODES.has(code)) {
		// eslint-disable-next-line no-console
		console.warn(`비정상적인 토큰 오류가 발생했습니다 (code: ${code})`);
	}

	useAuthStore.getState().clearSession();
	queryClient.removeQueries({ queryKey: ['userStatus'] });
};

export const refreshAccessToken = () => {
	if (!refreshPromise) {
		refreshPromise = getNewToken()
			.then(({ accessToken }) => {
				useAuthStore.getState().setAccessToken(accessToken);
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
