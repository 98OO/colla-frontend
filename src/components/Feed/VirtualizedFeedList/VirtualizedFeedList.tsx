import { memo } from 'react';
import VirtualList from '@components/common/VirtualList/VirtualList';
import Feed from '@components/Feed/Feed';
import useVirtualList from '@hooks/common/useVirtualList';
import usePinnedEditingFeeds from '@hooks/feed/usePinnedEditingFeeds';
import estimateFeedHeight from '@utils/feed/estimateFeedHeight';
import { FEED_VIRTUAL_OVERSCAN } from '@constants/feed';
import type { FeedData } from '@type/feed';
import * as S from './VirtualizedFeedList.styled';

interface VirtualizedFeedListProps {
	feeds: FeedData[];
	scrollContainer: HTMLDivElement;
}

const getFeedKey = (feed: FeedData) => feed.feedId;

const VirtualizedFeedList = memo(({ feeds, scrollContainer }: VirtualizedFeedListProps) => {
	const { extractRangeWithEditingFeeds, handleSchedulingEditChange } = usePinnedEditingFeeds(feeds);

	const virtualizer = useVirtualList({
		items: feeds,
		scrollElement: scrollContainer,
		overscan: FEED_VIRTUAL_OVERSCAN,
		getItemKey: getFeedKey,
		estimateSize: (index) => estimateFeedHeight(feeds[index]),
		rangeExtractor: extractRangeWithEditingFeeds,
	});

	return (
		<S.Container>
			<VirtualList
				items={feeds}
				virtualizer={virtualizer}
				renderItem={(feed) => (
					<S.FeedRow>
						<Feed feedData={feed} onSchedulingEditChange={handleSchedulingEditChange} />
					</S.FeedRow>
				)}
			/>
		</S.Container>
	);
});

VirtualizedFeedList.displayName = 'VirtualizedFeedList';

export default VirtualizedFeedList;
