import { memo } from 'react';
import VirtualList from '@components/common/VirtualList/VirtualList';
import Feed from '@components/Feed/Feed';
import SchedulingFeedTransition from '@components/Feed/SchedulingFeedTransition/SchedulingFeedTransition';
import useVirtualList from '@hooks/common/useVirtualList';
import useFastScrollPreview from '@hooks/feed/useFastScrollPreview';
import usePinnedEditingFeeds from '@hooks/feed/usePinnedEditingFeeds';
import usePriorityImageFeedId from '@hooks/feed/usePriorityImageFeedId';
import estimateFeedHeight from '@utils/feed/estimateFeedHeight';
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import { FEED_VIRTUAL_OVERSCAN } from '@constants/feed';
import type { FeedData } from '@type/feed';
import * as S from './VirtualizedFeedList.styled';

interface VirtualizedFeedListProps {
	feeds: FeedData[];
	scrollContainer: HTMLDivElement;
}

const getFeedKey = (feed: FeedData) => feed.feedId;

const VirtualizedFeedList = memo(({ feeds, scrollContainer }: VirtualizedFeedListProps) => {
	const { editingFeedIds, extractRangeWithEditingFeeds, handleSchedulingEditChange } =
		usePinnedEditingFeeds(feeds);

	const virtualizer = useVirtualList({
		items: feeds,
		scrollElement: scrollContainer,
		overscan: FEED_VIRTUAL_OVERSCAN,
		getItemKey: getFeedKey,
		estimateSize: (index) => estimateFeedHeight(feeds[index]),
		rangeExtractor: extractRangeWithEditingFeeds,
	});
	const virtualItems = virtualizer.getVirtualItems();
	const priorityImageFeedId = usePriorityImageFeedId({
		feeds,
		virtualItems,
		scrollContainer,
	});

	const shouldRenderFeedPreview = useFastScrollPreview({
		feeds,
		virtualItems,
		scrollContainer,
		editingFeedIds,
	});

	return (
		<LazyMotion features={domAnimation} strict>
			<MotionConfig reducedMotion='user'>
				<S.Container>
					<VirtualList
						items={feeds}
						virtualizer={virtualizer}
						renderItem={(feed, _, virtualItem) => {
							return (
								<S.FeedRow>
									{feed.feedType === 'SCHEDULING' ? (
										<SchedulingFeedTransition
											feedData={feed}
											height={virtualItem.size}
											shouldRenderPreview={shouldRenderFeedPreview(feed)}
											onEditChange={handleSchedulingEditChange}
										/>
									) : (
										<Feed
											feedData={feed}
											prioritizeImage={feed.feedId === priorityImageFeedId}
											onSchedulingEditChange={handleSchedulingEditChange}
										/>
									)}
								</S.FeedRow>
							);
						}}
					/>
				</S.Container>
			</MotionConfig>
		</LazyMotion>
	);
});

VirtualizedFeedList.displayName = 'VirtualizedFeedList';

export default VirtualizedFeedList;
