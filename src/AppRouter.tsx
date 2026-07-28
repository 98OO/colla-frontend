import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { appRoutes } from './routes';

const AppRouter = () => {
	const router = createBrowserRouter(appRoutes);

	return <RouterProvider router={router} />;
};

export default AppRouter;
