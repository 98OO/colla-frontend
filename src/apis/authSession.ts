import { getNewToken } from '@apis/user/getNewToken';
import { queryClient } from '@hooks/queries/common/queryClient';
import axios from 'axios';
import useAuthStore from '@stores/authStore';
import { HTTPError } from '@apis/HTTPError';
import { ABNORMAL_TOKEN_CODES, SESSION_INVALID_CODES } from '@constants/api';
import { AUTH_RESTORE_DISABLED_KEY } from '@constants/storage';

let refreshPromise: Promise<string> | null = null;

export const isCurrentSession = (sessionVersion: number) =>
	sessionVersion === useAuthStore.getState().sessionVersion;

export const clearClientSession = () => {
	useAuthStore.getState().clearSession();
	queryClient.removeQueries({ queryKey: ['userStatus'] });
};

export const invalidateSession = (code: number, requestSessionVersion: number) => {
	if (!isCurrentSession(requestSessionVersion)) return;

	if (ABNORMAL_TOKEN_CODES.has(code)) {
		// eslint-disable-next-line no-console
		console.warn(`비정상적인 토큰 오류가 발생했습니다 (code: ${code})`);
	}

	clearClientSession();
};

export const refreshAccessToken = () => {
	if (!refreshPromise) {
		const requestSessionVersion = useAuthStore.getState().sessionVersion;

		refreshPromise = getNewToken()
			.then(({ accessToken }) => {
				if (!isCurrentSession(requestSessionVersion)) {
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
					invalidateSession(error.code, requestSessionVersion);
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

	const restoreSessionVersion = useAuthStore.getState().sessionVersion;

	try {
		await refreshAccessToken();
	} catch (error) {
		if (axios.isCancel(error)) return;

		const { status, sessionVersion } = useAuthStore.getState();
		if (sessionVersion !== restoreSessionVersion || status !== 'loading') return;

		try {
			await refreshAccessToken();
		} catch (retryError) {
			if (axios.isCancel(retryError)) return;

			const currentSession = useAuthStore.getState();
			if (
				currentSession.sessionVersion === restoreSessionVersion &&
				currentSession.status === 'loading'
			) {
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
