import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from '@pages/LandingPage/LandingPage';
import SignInPage from '@pages/SignInPage/SignInPage';
import { PATH } from '@constants/path';
import App from './App';

const AppRouter = () => {
	const router = createBrowserRouter([
		{
			path: PATH.ROOT,
			element: <App />,
			children: [
				{
					path: '',
					element: <LandingPage />,
				},
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
