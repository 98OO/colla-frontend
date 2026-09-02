import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import type { FeedMenuType } from '@type/feed';

type LazyPostComponent = LazyExoticComponent<ComponentType>;

export const lazyPostComponentMap: Record<FeedMenuType, LazyPostComponent> = {
	normal: lazy(() => import('@components/Post/NormalPost/NormalPost')),
	scheduling: lazy(() => import('@components/Post/SchedulingPost/SchedulingPost')),
	collect: lazy(() => import('@components/Post/CollectPost/CollectPost')),
};
