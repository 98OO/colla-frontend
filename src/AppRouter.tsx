import type { RouteObject } from 'react-router-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavigationLayout from '@layouts/NavigationLayout';
import PageLayout from '@layouts/PageLayout';
import RootLayout from '@layouts/RootLayout';
import AuthGuard from '@components/common/Auth/AuthGuard';
import GuestOnlyGuard from '@components/common/Auth/GuestOnlyGuard';
import RoleGuard from '@components/common/Auth/RoleGuard';
import FeedPage from '@pages/FeedPage/FeedPage';
import LandingPage from '@pages/LandingPage/LandingPage';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import { PATH } from '@constants/path';
import { lazyRoutes } from './routes/lazyRoutes';

const appRoutes: RouteObject[] = [
	{
		path: PATH.ROOT,
		element: <RootLayout />,
		errorElement: <NotFoundPage />,
		children: [
			{
				element: <PageLayout />,
				children: [
					{
						element: <GuestOnlyGuard />,
						children: [
							{ path: '', element: <LandingPage /> },
							{ path: PATH.SIGNIN, lazy: lazyRoutes.signIn },
							{ path: PATH.SIGNUP, lazy: lazyRoutes.signUp },
						],
					},
					{ path: `${PATH.REDIRECT}/:provider`, lazy: lazyRoutes.redirect },
					{ path: PATH.INVITE, lazy: lazyRoutes.invite },
				],
			},
			{
				element: <AuthGuard />,
				children: [
					{
						element: <PageLayout />,
						children: [{ path: PATH.ENTRY, lazy: lazyRoutes.entry }],
					},
					{
						element: <NavigationLayout />,
						children: [
							{ path: PATH.FEED, element: <FeedPage /> },
							{
								element: <RoleGuard requiredRole='LEADER' />,
								children: [{ path: PATH.SETTING, lazy: lazyRoutes.setting }],
							},
							{ path: PATH.MYPAGE, lazy: lazyRoutes.myPage },
							{ path: PATH.POST, lazy: lazyRoutes.post },
							{ path: PATH.CHAT, lazy: lazyRoutes.chat },
							{ path: PATH.DOCUMENT, lazy: lazyRoutes.document },
						],
					},
				],
			},
		],
	},
];

const router = createBrowserRouter(appRoutes);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
