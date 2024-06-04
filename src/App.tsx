import { Outlet, useLocation } from 'react-router-dom';
import Flex from '@components/common/Flex/Flex';
import GlobalErrorBoundary from '@components/common/GlobalErrorBoundary/GlobalErrorBoundary';
import GNB from '@components/common/GNB/GNB';
import SNBFull from '@components/common/SideNavigationBar/SNBFull/SNBFull';
import SNBIcon from '@components/common/SideNavigationBar/SNBIcon/SNBIcon';
import ToastContainer from '@components/common/ToastContainer/ToastContainer';
import useWindowWidth from '@hooks/window/useWindowWidth';
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
	].some((path) => location.pathname.includes(path));

	return (
		<GlobalErrorBoundary>
			<Flex direction='column'>
				{isNavigationBarVisible && <GNB />}
				<Flex>
					{isNavigationBarVisible &&
						(isMobileView || isChatPage ? <SNBIcon /> : <SNBFull />)}
					<main>
						<Outlet />
					</main>
				</Flex>
			</Flex>
			<ToastContainer />
		</GlobalErrorBoundary>
	);
}

export default App;
