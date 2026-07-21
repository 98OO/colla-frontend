import { GetFeedsParams, getFeeds } from '@apis/Feed/getFeeds';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

const useFeedsQuery = ({ teamspaceId, limit, type }: GetFeedsParams) => {
	const {
		data: feeds,
		hasNextPage,
		isFetching,
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

	return { feeds, hasNextPage, isFetching, fetchNextPage };
};

export default useFeedsQuery;
