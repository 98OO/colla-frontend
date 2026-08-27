import { Outlet, useLocation } from 'react-router-dom';
import AsyncBoundary from '@components/common/AsyncBoundary/AsyncBoundary';
import Flex from '@components/common/Flex/Flex';

const PageLayout = () => {
	const location = useLocation();

	return (
		<Flex direction='column'>
			<Flex>
				<main>
					<AsyncBoundary resetKeys={[location.pathname]}>
						<Outlet />
					</AsyncBoundary>
				</main>
			</Flex>
		</Flex>
	);
};

export default PageLayout;
