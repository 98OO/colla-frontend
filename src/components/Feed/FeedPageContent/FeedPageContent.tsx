import { memo } from 'react';
import SelectedFeedDetail from '@components/Feed/Detail/SelectedFeedDetail';
import Feed from '@components/Feed/Feed';
import NextPageTrigger from '@components/Feed/NextPageTrigger/NextPageTrigger';
import useFeedsQuery from '@hooks/queries/Feed/useFeedsQuery';
import type { FeedType } from '@type/feed';

interface FeedPageContentProps {
	teamspaceId: number;
	scrollContainer: HTMLElement;
	feedType?: FeedType;
}

const FeedPageContent = memo(({ teamspaceId, scrollContainer, feedType }: FeedPageContentProps) => {
	const { feedPages, hasNextPage, isFetchingNextPage, isError, fetchNextPage } = useFeedsQuery({
		teamspaceId,
		type: feedType,
	});
	const feeds = feedPages.pages.flatMap((pageData) => pageData.content.feeds);

	return (
		<>
			{feeds.map((feedData) => (
				<Feed key={feedData.feedId} feedData={feedData} />
			))}
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
