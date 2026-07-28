import { Outlet } from 'react-router-dom';
import GlobalErrorBoundary from '@components/common/GlobalErrorBoundary/GlobalErrorBoundary';
import ToastContainer from '@components/common/ToastContainer/ToastContainer';

const RootLayout = () => (
	<GlobalErrorBoundary>
		<Outlet />
		<ToastContainer />
		<div id='modal-root' />
		<div id='drawer-root' />
	</GlobalErrorBoundary>
);

export default RootLayout;
