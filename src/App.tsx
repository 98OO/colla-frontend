import { Outlet, useLocation } from 'react-router-dom';
import SNBFull from '@components/common/SideNavigationBar/SNBFull/SNBFull';
import SNBIcon from '@components/common/SideNavigationBar/SNBIcon/SNBIcon';
import ToastContainer from '@components/common/ToastContainer/ToastContainer';
import useWindowWidth from '@hooks/window/useWindowWidth';
import { PATH } from '@constants/path';

function App() {
	const location = useLocation();
	const isMobileView = useWindowWidth();
	const isChatPage = location.pathname.includes(PATH.CHAT);
	const isSideNavigationBarVisible = [
		PATH.SCHEDULE,
		PATH.FEED,
		PATH.DOCUMENT,
		PATH.PRESENTATION,
	].some((path) => location.pathname.includes(path));

	return (
		<>
			{isSideNavigationBarVisible && (isMobileView ? <SNBIcon /> : <SNBFull />)}
			{isChatPage && <SNBIcon />}
			<main>
				<Outlet />
			</main>
			<ToastContainer />
		</>
	);
}

export default App;
