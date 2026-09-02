import { Outlet } from 'react-router-dom';
import AuthSessionManager from '@components/common/Auth/AuthSessionManager';
import GlobalErrorBoundary from '@components/common/GlobalErrorBoundary/GlobalErrorBoundary';
import RouteProgressBar from '@components/common/RouteProgressBar/RouteProgressBar';
import ToastContainer from '@components/common/ToastContainer/ToastContainer';

const RootLayout = () => (
	<GlobalErrorBoundary>
		<AuthSessionManager>
			<RouteProgressBar />
			<Outlet />
			<ToastContainer />
			<div id='modal-root' />
			<div id='drawer-root' />
		</AuthSessionManager>
	</GlobalErrorBoundary>
);

export default RootLayout;
