import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@stores/authStore';
import useSocketStore from '@stores/socketStore';
import { refreshAccessToken } from '@apis/authSession';
import { PATH } from '@constants/path';

const useAuthSession = () => {
	const curAuthStatus = useAuthStore((state) => state.status);
	const prevAuthStatus = useRef(curAuthStatus);

	const navigate = useNavigate();
	const { connect, disconnect } = useSocketStore();

	useEffect(() => {
		refreshAccessToken().catch(() => useAuthStore.getState().clearSession());
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

	return curAuthStatus;
};

export default useAuthSession;
