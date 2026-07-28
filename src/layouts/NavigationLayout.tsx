import { Outlet, useLocation } from 'react-router-dom';
import AsyncBoundary from '@components/common/AsyncBoundary/AsyncBoundary';
import Flex from '@components/common/Flex/Flex';
import GNB from '@components/common/GNB/GNB';
import SNBFull from '@components/common/SideNavigationBar/SNBFull/SNBFull';
import SNBIcon from '@components/common/SideNavigationBar/SNBIcon/SNBIcon';
import useWindowWidth from '@hooks/window/useWindowWidth';
import { PATH } from '@constants/path';

const NavigationLayout = () => {
	const location = useLocation();
	const isMobileView = useWindowWidth();
	const isChatPage = location.pathname === PATH.CHAT;

	return (
		<Flex direction='column'>
			<GNB />
			<Flex>
				{isMobileView || isChatPage ? <SNBIcon /> : <SNBFull />}
				<main>
					<AsyncBoundary resetKeys={[location.pathname]}>
						<Outlet />
					</AsyncBoundary>
				</main>
			</Flex>
		</Flex>
	);
};

export default NavigationLayout;
