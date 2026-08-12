import { useState } from 'react';
import AsyncBoundary from '@components/common/AsyncBoundary/AsyncBoundary';
import FeedPageContent from '@components/Feed/FeedPageContent/FeedPageContent';
import FeedSkeletonList from '@components/Feed/FeedSkeletonList/FeedSkeletonList';
import type { FeedType } from '@type/feed';
import * as S from './FeedPageContentContainer.styled';

interface FeedPageContentContainerProps {
	teamspaceId: number | undefined;
	isFeedDetailOpen: boolean;
	feedType?: FeedType;
}

const FeedPageContentContainer = ({
	teamspaceId,
	isFeedDetailOpen,
	feedType,
}: FeedPageContentContainerProps) => {
	const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
	const canRenderFeedPageContent = teamspaceId !== undefined && scrollContainer !== null;

	return (
		<S.FeedPageContentContainer ref={setScrollContainer} $isOpen={isFeedDetailOpen}>
			{canRenderFeedPageContent ? (
				<AsyncBoundary loadingFallback={<FeedSkeletonList />} resetKeys={[teamspaceId, feedType]}>
					<FeedPageContent
						teamspaceId={teamspaceId}
						scrollContainer={scrollContainer}
						feedType={feedType}
					/>
				</AsyncBoundary>
			) : (
				<FeedSkeletonList />
			)}
		</S.FeedPageContentContainer>
	);
};

export default FeedPageContentContainer;
