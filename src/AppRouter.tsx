import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PATH } from '@constants/path';
import App from './App';
import SignInPage from './pages/SignInPage/SignInPage';

const AppRouter = () => {
	const router = createBrowserRouter([
		{
			path: PATH.ROOT,
			element: <App />,
			children: [
				{
					path: PATH.SIGNIN,
					element: <SignInPage />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default AppRouter;
