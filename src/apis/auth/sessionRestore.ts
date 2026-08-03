import { clearClientSession } from '@apis/auth/sessionActions';
import { refreshAccessToken } from '@apis/auth/tokenRefreshManager';
import useAuthStore from '@stores/authStore';
import { AUTH_RESTORE_DISABLED_KEY } from '@constants/storage';

const shouldSkipSessionRestore = () => {
	if (window.localStorage.getItem(AUTH_RESTORE_DISABLED_KEY) !== 'true') return false;

	if (useAuthStore.getState().status !== 'guest') clearClientSession();

	return true;
};

export const restoreSession = async () => {
	if (shouldSkipSessionRestore()) return;

	await refreshAccessToken();
};

export const retrySessionRestore = () => {
	useAuthStore.getState().startBootstrapping();

	return restoreSession();
};
