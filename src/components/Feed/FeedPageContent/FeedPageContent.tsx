import { memo, useMemo } from 'react';
import SelectedFeedDetail from '@components/Feed/Detail/SelectedFeedDetail';
import NextPageTrigger from '@components/Feed/NextPageTrigger/NextPageTrigger';
import VirtualizedFeedList from '@components/Feed/VirtualizedFeedList/VirtualizedFeedList';
import useFeedsQuery from '@hooks/queries/Feed/useFeedsQuery';
import type { FeedType } from '@type/feed';

interface FeedPageContentProps {
	teamspaceId: number;
	scrollContainer: HTMLDivElement;
	feedType?: FeedType;
}

const FeedPageContent = memo(({ teamspaceId, scrollContainer, feedType }: FeedPageContentProps) => {
	const { feedPages, hasNextPage, isFetchingNextPage, isError, fetchNextPage } = useFeedsQuery({
		teamspaceId,
		type: feedType,
	});

	const feeds = useMemo(
		() => feedPages.pages.flatMap((pageData) => pageData.content.feeds),
		[feedPages.pages]
	);

	return (
		<>
			<VirtualizedFeedList feeds={feeds} scrollContainer={scrollContainer} />
			<NextPageTrigger
				scrollContainer={scrollContainer}
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				isQueryError={isError}
				fetchNextPage={fetchNextPage}
			/>
			<SelectedFeedDetail feeds={feeds} />
		</>
	);
});

FeedPageContent.displayName = 'FeedPageContent';

export default FeedPageContent;
