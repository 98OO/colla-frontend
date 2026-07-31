import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import SelectedFeedDetail from '@components/Feed/Detail/SelectedFeedDetail';
import Feed from '@components/Feed/Feed';
import useFeedsQuery from '@hooks/queries/Feed/useFeedsQuery';
import type { FeedType } from '@type/feed';

interface FeedListProps {
	teamspaceId: number;
	type?: FeedType;
}

const FeedList = memo(({ teamspaceId, type }: FeedListProps) => {
	const { feeds, hasNextPage, isFetching, fetchNextPage } = useFeedsQuery({
		teamspaceId,
		type,
	});
	const loadedFeeds = feeds.pages.flatMap((pageData) => pageData.content.feeds);

	return (
		<>
			<InfiniteScroll
				loadMore={() => {
					if (!isFetching) fetchNextPage();
				}}
				hasMore={hasNextPage}
				useWindow={false}>
				{loadedFeeds.map((feedData) => (
					<Feed key={feedData.feedId} feedData={feedData} />
				))}
			</InfiniteScroll>
			<SelectedFeedDetail feeds={loadedFeeds} />
		</>
	);
});

FeedList.displayName = 'FeedList';

export default FeedList;
