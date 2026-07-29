import InfiniteScroll from 'react-infinite-scroller';
import Feed from '@components/Feed/Feed';
import useFeedsQuery from '@hooks/queries/Feed/useFeedsQuery';
import type { FeedData, FeedType } from '@type/feed';

interface FeedListProps {
	teamspaceId: number;
	type?: FeedType;
	isDrawerOpen: (feedId: number) => boolean;
	openDrawer: (feedId: number) => void;
	closeDrawer: () => void;
}

const FeedList = ({ teamspaceId, type, isDrawerOpen, openDrawer, closeDrawer }: FeedListProps) => {
	const { feeds, hasNextPage, isFetching, fetchNextPage } = useFeedsQuery({
		teamspaceId,
		type,
	});

	return (
		<InfiniteScroll
			loadMore={() => {
				if (!isFetching) fetchNextPage();
			}}
			hasMore={hasNextPage}
			useWindow={false}>
			{feeds.pages.map((pageData) => {
				return pageData.content.feeds.map((feedData: FeedData) => {
					const { feedId } = feedData;

					return (
						<Feed
							key={feedId}
							feedData={feedData}
							isDetailOpen={isDrawerOpen(feedId)}
							openDetail={() => openDrawer(feedId)}
							closeDetail={closeDrawer}
						/>
					);
				});
			})}
		</InfiniteScroll>
	);
};

export default FeedList;
