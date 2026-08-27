import { GetFeedsParams, getFeeds } from '@apis/Feed/getFeeds';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

const useFeedsQuery = ({ teamspaceId, limit, type }: GetFeedsParams) => {
	const {
		data: feedPages,
		hasNextPage,
		isFetchingNextPage,
		isError,
		fetchNextPage,
	} = useSuspenseInfiniteQuery({
		queryKey: ['feeds', teamspaceId, type],
		initialPageParam: undefined,
		queryFn: ({ pageParam }) =>
			getFeeds({
				teamspaceId,
				limit,
				after: pageParam,
				type,
			}),
		getNextPageParam: (lastPage) => {
			const lastFeedPage = lastPage.content.feeds;
			const lastFeed = lastFeedPage[lastFeedPage.length - 1];

			if (lastFeed) return lastFeed.feedId;

			return undefined;
		},
	});

	return { feedPages, hasNextPage, isFetchingNextPage, isError, fetchNextPage };
};

export default useFeedsQuery;
