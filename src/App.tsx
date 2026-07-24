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
import { HTTP_ERROR_MESSAGE } from '@constants/api';
import { PATH } from '@constants/path';

function App() {
	const location = useLocation();
	const isMobileView = useWindowWidth();
	const isChatPage = location.pathname.includes(PATH.CHAT);
	const isNavigationBarVisible = [
		PATH.SCHEDULE,
		PATH.FEED,
		PATH.DOCUMENT,
		PATH.PRESENTATION,
		PATH.SETTING,
		PATH.MYPAGE,
		PATH.CHAT,
		PATH.DOCUMENT,
	].some((path) => location.pathname.includes(path));

	const { status: authStatus, retry } = useAuthSession();

	if (authStatus === 'error') {
		return <Error errorMessage={HTTP_ERROR_MESSAGE.DEFAULT} resetError={retry} />;
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
