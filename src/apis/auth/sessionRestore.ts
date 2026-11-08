import { clearClientSession } from '@apis/auth/sessionActions';
import { refreshAccessToken } from '@apis/auth/tokenRefreshManager';
import useAuthStore from '@stores/authStore';
import { SESSION_RESTORE_ENABLED_KEY } from '@constants/storage';

const shouldSkipSessionRestore = () => {
	if (window.localStorage.getItem(SESSION_RESTORE_ENABLED_KEY) === 'true') return false;

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
