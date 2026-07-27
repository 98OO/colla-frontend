import { queryClient } from '@hooks/queries/common/queryClient';
import useAuthStore from '@stores/authStore';
import { ABNORMAL_TOKEN_CODES } from '@constants/api';
import { AUTH_RESTORE_DISABLED_KEY } from '@constants/storage';

export const isCurrentSession = (sessionVersion: number) =>
	sessionVersion === useAuthStore.getState().sessionVersion;

export const clearSessionCache = () => queryClient.clear();

export const clearClientSession = () => {
	clearSessionCache();
	useAuthStore.getState().clearSession();
};

export const invalidateSession = (code: number, requestSessionVersion: number) => {
	if (!isCurrentSession(requestSessionVersion)) return;

	if (ABNORMAL_TOKEN_CODES.has(code)) {
		// eslint-disable-next-line no-console
		console.warn(`비정상적인 토큰 오류가 발생했습니다 (code: ${code})`);
	}

	clearClientSession();
};

export const signIn = (accessToken: string) => {
	clearSessionCache();

	window.localStorage.removeItem(AUTH_RESTORE_DISABLED_KEY);
	useAuthStore.getState().initializeSession(accessToken);
};

export const signOut = () => {
	window.localStorage.setItem(AUTH_RESTORE_DISABLED_KEY, 'true');
	clearClientSession();
};
