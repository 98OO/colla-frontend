import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import SanitizedHtml from '@components/common/SanitizedHtml/SanitizedHtml';
import BaseFeed from '@components/Feed/BaseFeed/BaseFeed';
import useDetailObserver from '@hooks/feed/useDetailObserver';
import { selectFeedDetail } from '@stores/feedDetailStore';
import type { NormalFeed } from '@type/feed';
import * as S from './NormalFeed.styled';

interface NormalFeedProps {
	feedData: NormalFeed;
}

const NormalFeed = ({ feedData }: NormalFeedProps) => {
	const { feedId, details } = feedData;
	const { content } = details;
	const { showMoreButton, detailRef } = useDetailObserver(content);
	const openDetail = () => selectFeedDetail(feedId);

	return (
		<BaseFeed feedData={feedData}>
			{details && (
				<S.DetailWrapper ref={detailRef} hasMoreButton={showMoreButton}>
					<SanitizedHtml html={details.content} />
				</S.DetailWrapper>
			)}
			{showMoreButton && (
				<Flex>
					<Button type='button' size='sm' variant='secondary' label='더보기' onClick={openDetail} />
				</Flex>
			)}
		</BaseFeed>
	);
};

export default NormalFeed;
