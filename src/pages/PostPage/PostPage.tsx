import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { lazyPostComponentMap } from '@components/Post/lazyPostComponents';
import LNB from '@components/Post/LNB/LNB';
import PostLoadingFallback from '@components/Post/PostLoadingFallback/PostLoadingFallback';
import type { FeedMenuType } from '@type/feed';
import * as S from './PostPage.styled';

const PostPage = () => {
	const { search } = useLocation();
	const feedType = new URLSearchParams(search).get('type') as FeedMenuType;
	const LazyPostComponent = lazyPostComponentMap[feedType];

	return (
		<S.Container>
			<LNB selected={feedType} />
			<Suspense fallback={<PostLoadingFallback feedType={feedType} />}>
				{LazyPostComponent && <LazyPostComponent />}
			</Suspense>
		</S.Container>
	);
};

export default PostPage;
