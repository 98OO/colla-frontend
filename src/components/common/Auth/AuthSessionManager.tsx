import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { clearClientSession } from '@apis/auth/sessionActions';
import { restoreSession } from '@apis/auth/sessionRestore';
import Error from '@components/common/Error/Error';
import useAuthStore from '@stores/authStore';
import useSocketStore from '@stores/socketStore';
import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from '@constants/api';
import { AUTH_RESTORE_DISABLED_KEY } from '@constants/storage';
import type { AuthStatus, AuthUnavailableReason } from '@type/auth';

interface AuthSessionManagerProps {
	children: ReactNode;
}

const getAuthErrorMessage = (reason: AuthUnavailableReason | null) => {
	switch (reason?.type) {
		case 'network':
			return HTTP_ERROR_MESSAGE.NETWORK;
		case 'server':
			return HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR];
		case 'client':
		default:
			return HTTP_ERROR_MESSAGE.DEFAULT;
	}
};

const retrySessionRestore = () => {
	useAuthStore.getState().startBootstrapping();

	return restoreSession();
};

const useRestoreSessionOnMount = () => {
	useEffect(() => {
		restoreSession();
	}, []);
};

const useSyncSessionAcrossTabs = () => {
	useEffect(() => {
		const handleStorage = (event: StorageEvent) => {
			if (event.key !== AUTH_RESTORE_DISABLED_KEY || event.newValue !== 'true') return;

			clearClientSession();
		};

		window.addEventListener('storage', handleStorage);

		return () => window.removeEventListener('storage', handleStorage);
	}, []);
};

const useSyncSocketWithAuthStatus = (status: AuthStatus) => {
	const previousStatus = useRef(status);
	const connect = useSocketStore((state) => state.connect);
	const disconnect = useSocketStore((state) => state.disconnect);

	useEffect(() => {
		if (previousStatus.current !== 'authenticated' && status === 'authenticated') {
			const { accessToken } = useAuthStore.getState();

			if (accessToken) connect(accessToken);
		}

		if (previousStatus.current === 'authenticated' && status === 'guest') {
			disconnect();
		}

		previousStatus.current = status;
	}, [status, connect, disconnect]);
};

const AuthSessionManager = ({ children }: AuthSessionManagerProps) => {
	const status = useAuthStore((state) => state.status);
	const unavailableReason = useAuthStore((state) => state.unavailableReason);

	useRestoreSessionOnMount();
	useSyncSessionAcrossTabs();
	useSyncSocketWithAuthStatus(status);

	if (status === 'unavailable') {
		return (
			<Error
				errorMessage={getAuthErrorMessage(unavailableReason)}
				resetError={retrySessionRestore}
			/>
		);
	}

	return children;
};

export default AuthSessionManager;
