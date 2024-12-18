import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ChatPage from '@pages/ChatPage/ChatPage';
import DocumentPage from '@pages/DocumentPage/DocumentPage';
import EntryPage from '@pages/EntryPage/EntryPage';
import FeedPage from '@pages/FeedPage/FeedPage';
import InvitePage from '@pages/InvitePage/InvitePage';
import LandingPage from '@pages/LandingPage/LandingPage';
import MyPage from '@pages/MyPage/MyPage';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import PostPage from '@pages/PostPage/PostPage';
import RedirectPage from '@pages/RedirectPage/RedirectPage';
import SettingPage from '@pages/SettingPage/SettingPage';
import SignInPage from '@pages/SignInPage/SignInPage';
import SignUpPage from '@pages/SignUpPage/SignUpPage';
import { PATH } from '@constants/path';
import App from './App';

const AppRouter = () => {
	const router = createBrowserRouter([
		{
			path: PATH.ROOT,
			element: <App />,
			errorElement: <NotFoundPage />,
			children: [
				{
					path: '',
					element: <LandingPage />,
				},
				{
					path: PATH.SIGNIN,
					element: <SignInPage />,
				},
				{
					path: PATH.SIGNUP,
					element: <SignUpPage />,
				},
				{
					path: `${PATH.REDIRECT}/:provider`,
					element: <RedirectPage />,
				},
				{
					path: PATH.ENTRY,
					element: <EntryPage />,
				},
				{
					path: PATH.INVITE,
					element: <InvitePage />,
				},
				{
					path: PATH.SETTING,
					element: <SettingPage />,
				},
				{
					path: PATH.MYPAGE,
					element: <MyPage />,
				},
				{
					path: PATH.FEED,
					element: <FeedPage />,
				},
				{
					path: PATH.POST,
					element: <PostPage />,
				},
				{
					path: PATH.CHAT,
					element: <ChatPage />,
				},
				{
					path: PATH.DOCUMENT,
					element: <DocumentPage />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default AppRouter;
