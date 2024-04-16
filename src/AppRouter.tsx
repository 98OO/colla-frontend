import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PATH } from '@constants/path';
import App from './App';

const AppRouter = () => {
	const router = createBrowserRouter([
		{
			path: PATH.ROOT,
			element: <App />,
		},
	]);

	return <RouterProvider router={router} />;
};

export default AppRouter;
