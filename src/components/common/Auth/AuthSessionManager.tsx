import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { matchPath } from 'react-router-dom';
import { clearClientSession } from '@apis/auth/sessionActions';
import { restoreSession } from '@apis/auth/sessionRestore';
import useAuthStore from '@stores/authStore';
import useSocketStore from '@stores/socketStore';
import { PATH } from '@constants/path';
import { AUTH_RESTORE_DISABLED_KEY } from '@constants/storage';
import type { AuthStatus } from '@type/auth';

interface AuthSessionManagerProps {
	children: ReactNode;
}

const useRestoreSessionOnMount = () => {
	useEffect(() => {
		const isOAuthCallback = matchPath(`${PATH.REDIRECT}/:provider`, window.location.pathname);

		if (isOAuthCallback) return;

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

	useRestoreSessionOnMount();
	useSyncSessionAcrossTabs();
	useSyncSocketWithAuthStatus(status);

	return children;
};

export default AuthSessionManager;
