import { useLocation } from 'react-router-dom';
import LNB from '@components/Post/LNB/LNB';
import NormalPost from '@components/Post/NormalPost/NormalPost';
import SchedulingPost from '@components/Post/SchedulingPost/SchedulingPost';
import type { FeedMenuType } from '@type/feed';
import * as S from './PostPage.styled';

const PostPage = () => {
	const { search } = useLocation();
	const feedType = new URLSearchParams(search).get('type') as FeedMenuType;

	return (
		<S.Container>
			<LNB selected={feedType} />
			{feedType === 'normal' && <NormalPost />}
			{feedType === 'scheduling' && <SchedulingPost />}
		</S.Container>
	);
};

export default PostPage;
