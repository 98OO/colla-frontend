import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearClientSession } from '@apis/auth/sessionActions';
import { restoreSession } from '@apis/auth/sessionRestore';
import useAuthStore from '@stores/authStore';
import useSocketStore from '@stores/socketStore';
import { PATH } from '@constants/path';
import { AUTH_RESTORE_DISABLED_KEY } from '@constants/storage';

const useAuthSession = () => {
	const curAuthStatus = useAuthStore((state) => state.status);
	const prevAuthStatus = useRef(curAuthStatus);

	const navigate = useNavigate();
	const connect = useSocketStore((state) => state.connect);
	const disconnect = useSocketStore((state) => state.disconnect);

	const retry = () => {
		useAuthStore.getState().startBootstrapping();
		restoreSession();
	};

	useEffect(() => {
		restoreSession();
	}, []);

	useEffect(() => {
		const handleStorage = (event: StorageEvent) => {
			if (event.key !== AUTH_RESTORE_DISABLED_KEY || event.newValue !== 'true') return;

			clearClientSession();
		};

		window.addEventListener('storage', handleStorage);

		return () => window.removeEventListener('storage', handleStorage);
	}, []);

	useEffect(() => {
		if (prevAuthStatus.current !== 'authenticated' && curAuthStatus === 'authenticated') {
			const { accessToken } = useAuthStore.getState();

			if (accessToken) connect(accessToken);
		}

		if (prevAuthStatus.current === 'authenticated' && curAuthStatus === 'guest') {
			disconnect();
			navigate(PATH.SIGNIN, { replace: true });
		}

		prevAuthStatus.current = curAuthStatus;
	}, [curAuthStatus, connect, disconnect, navigate]);

	return { status: curAuthStatus, retry };
};

export default useAuthSession;
