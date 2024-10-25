import { useLocation } from 'react-router-dom';
import LNB from '@components/Post/LNB/LNB';
import type { FeedMenuType } from '@type/feed';
import * as S from './PostPage.styled';

const PostPage = () => {
	const { search } = useLocation();
	const feedType = new URLSearchParams(search).get('type') as FeedMenuType;

	return (
		<S.Container>
			<LNB selected={feedType} />
		</S.Container>
	);
};

export default PostPage;
