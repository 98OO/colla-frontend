import { clearClientSession, isCurrentSession } from '@apis/auth/sessionActions';
import { refreshAccessToken } from '@apis/auth/tokenRefresh';
import axios from 'axios';
import useAuthStore from '@stores/authStore';
import { AUTH_RESTORE_DISABLED_KEY } from '@constants/storage';

const shouldSkipSessionRestore = () => {
	if (window.localStorage.getItem(AUTH_RESTORE_DISABLED_KEY) !== 'true') return false;

	if (useAuthStore.getState().status !== 'guest') clearClientSession();

	return true;
};

const isSessionRestoreInProgress = (sessionVersion: number) =>
	isCurrentSession(sessionVersion) && useAuthStore.getState().status === 'loading';

const retrySessionRestore = async (sessionVersion: number) => {
	try {
		await refreshAccessToken();
	} catch (error) {
		if (axios.isCancel(error)) return;

		if (isSessionRestoreInProgress(sessionVersion)) {
			useAuthStore.getState().setSessionError();
		}
	}
};

export const restoreSession = async () => {
	if (shouldSkipSessionRestore()) return;

	const { sessionVersion } = useAuthStore.getState();

	try {
		await refreshAccessToken();
	} catch (error) {
		if (axios.isCancel(error)) return;
		if (!isSessionRestoreInProgress(sessionVersion)) return;

		await retrySessionRestore(sessionVersion);
	}
};
