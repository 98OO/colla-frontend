import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import BaseFeed from '@components/Feed/BaseFeed/BaseFeed';
import NormalDetail from '@components/Feed/Detail/Normal/NormalDetail';
import useDetailObserver from '@hooks/feed/useDetailObserver';
import type { NormalFeed } from '@type/feed';
import * as S from './NormalFeed.styled';

interface NormalFeedProps {
	feedData: NormalFeed;
	isDetailOpen: boolean;
	openDetail: () => void;
	closeDetail: () => void;
}

const NormalFeed = ({
	feedData,
	isDetailOpen,
	openDetail,
	closeDetail,
}: NormalFeedProps) => {
	const { details } = feedData;
	const { content } = details;
	const { showMoreButton, detailRef } = useDetailObserver(content);

	return (
		<BaseFeed
			feedData={feedData}
			isDetailOpen={isDetailOpen}
			openDetail={openDetail}
			closeDetail={closeDetail}
			renderDetail={() => <NormalDetail feedData={feedData} />}>
			{details && (
				<S.DetailWrapper ref={detailRef} hasMoreButton={showMoreButton}>
					<div dangerouslySetInnerHTML={{ __html: details.content || '' }} />
				</S.DetailWrapper>
			)}
			{showMoreButton && (
				<Flex>
					<Button
						type='button'
						size='sm'
						variant='secondary'
						label='더보기'
						onClick={openDetail}
					/>
				</Flex>
			)}
		</BaseFeed>
	);
};

export default NormalFeed;
