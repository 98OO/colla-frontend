import { Outlet, useLocation } from 'react-router-dom';
import AsyncBoundary from '@components/common/AsyncBoundary/AsyncBoundary';
import Error from '@components/common/Error/Error';
import Flex from '@components/common/Flex/Flex';
import GlobalErrorBoundary from '@components/common/GlobalErrorBoundary/GlobalErrorBoundary';
import GNB from '@components/common/GNB/GNB';
import SNBFull from '@components/common/SideNavigationBar/SNBFull/SNBFull';
import SNBIcon from '@components/common/SideNavigationBar/SNBIcon/SNBIcon';
import ToastContainer from '@components/common/ToastContainer/ToastContainer';
import useAuthSession from '@hooks/auth/useAuthSession';
import useWindowWidth from '@hooks/window/useWindowWidth';
import useAuthStore from '@stores/authStore';
import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from '@constants/api';
import { PATH } from '@constants/path';
import type { AuthUnavailableReason } from '@type/auth';

const getAuthErrorMessage = (reason: AuthUnavailableReason | null) => {
	if (reason?.type === 'network') return HTTP_ERROR_MESSAGE.NETWORK;
	if (reason?.type === 'server') {
		return HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR];
	}

	return HTTP_ERROR_MESSAGE.DEFAULT;
};

function App() {
	const location = useLocation();
	const isMobileView = useWindowWidth();
	const { status: authStatus, retry } = useAuthSession();
	const unavailableReason = useAuthStore((state) => state.unavailableReason);
	const isChatPage = location.pathname.includes(PATH.CHAT);
	const isNavigationBarVisible =
		authStatus === 'authenticated' &&
		[
			PATH.SCHEDULE,
			PATH.FEED,
			PATH.DOCUMENT,
			PATH.PRESENTATION,
			PATH.SETTING,
			PATH.MYPAGE,
			PATH.CHAT,
			PATH.DOCUMENT,
		].some((path) => location.pathname.includes(path));

	if (authStatus === 'unavailable') {
		return <Error errorMessage={getAuthErrorMessage(unavailableReason)} resetError={retry} />;
	}

	return (
		<GlobalErrorBoundary>
			<Flex direction='column'>
				{isNavigationBarVisible && <GNB />}
				<Flex>
					{isNavigationBarVisible && (isMobileView || isChatPage ? <SNBIcon /> : <SNBFull />)}
					<main>
						<AsyncBoundary resetKeys={[location.pathname]}>
							<Outlet />
						</AsyncBoundary>
					</main>
				</Flex>
			</Flex>
			<ToastContainer />
			<div id='modal-root' />
			<div id='drawer-root' />
		</GlobalErrorBoundary>
	);
}

export default App;
