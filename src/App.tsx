import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Flex from '@components/common/Flex/Flex';
import GlobalErrorBoundary from '@components/common/GlobalErrorBoundary/GlobalErrorBoundary';
import GNB from '@components/common/GNB/GNB';
import SNBFull from '@components/common/SideNavigationBar/SNBFull/SNBFull';
import SNBIcon from '@components/common/SideNavigationBar/SNBIcon/SNBIcon';
import ToastContainer from '@components/common/ToastContainer/ToastContainer';
import useWindowWidth from '@hooks/window/useWindowWidth';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useSocketStore from '@stores/socketStore';
import { ACCESS_TOKEN } from '@constants/api';
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

	const { setStompClient } = useSocketStore();

	const onConnected = () => {
		if (localStorage.getItem(ACCESS_TOKEN)) {
			const client = Stomp.over(function () {
				return new SockJS(
					`http://52.78.169.30/ws-stomp?accessToken=${localStorage.getItem(ACCESS_TOKEN)}`
				);
			});

			client.connect({}, () => {
				setStompClient(client);
			});
		}
	};

	useEffect(() => {
		onConnected();
	}, []);

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
