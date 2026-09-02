import type { ComponentType } from 'react';
import type { LazyRouteFunction, RouteObject } from 'react-router-dom';

interface DefaultComponentModule {
	default: ComponentType;
}

type PageModuleImporter = () => Promise<DefaultComponentModule>;

const createLazyRoute =
	(importPageModule: PageModuleImporter): LazyRouteFunction<RouteObject> =>
	async () => {
		const { default: Component } = await importPageModule();

		return { Component };
	};

export const lazyRoutes = {
	signIn: createLazyRoute(() => import('@pages/SignInPage/SignInPage')),
	signUp: createLazyRoute(() => import('@pages/SignUpPage/SignUpPage')),
	redirect: createLazyRoute(() => import('@pages/RedirectPage/RedirectPage')),
	invite: createLazyRoute(() => import('@pages/InvitePage/InvitePage')),
	entry: createLazyRoute(() => import('@pages/EntryPage/EntryPage')),
	setting: createLazyRoute(() => import('@pages/SettingPage/SettingPage')),
	myPage: createLazyRoute(() => import('@pages/MyPage/MyPage')),
	post: createLazyRoute(() => import('@pages/PostPage/PostPage')),
	chat: createLazyRoute(() => import('@pages/ChatPage/ChatPage')),
	document: createLazyRoute(() => import('@pages/DocumentPage/DocumentPage')),
};
