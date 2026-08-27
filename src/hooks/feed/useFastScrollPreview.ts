import { useLayoutEffect, useRef } from 'react';
import useFastScroll from '@hooks/feed/useFastScroll';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { FeedData } from '@type/feed';

interface UseFastScrollPreview {
	feeds: FeedData[];
	virtualItems: VirtualItem[];
	scrollContainer: HTMLElement;
	editingFeedIds: Set<number>;
}

const useFastScrollPreview = ({
	feeds,
	virtualItems,
	scrollContainer,
	editingFeedIds,
}: UseFastScrollPreview) => {
	const feedIdsInVirtualRangeBeforeFastScrollRef = useRef<Set<number>>(new Set());
	const isFastScrolling = useFastScroll(scrollContainer);

	useLayoutEffect(() => {
		if (isFastScrolling) return;

		feedIdsInVirtualRangeBeforeFastScrollRef.current = new Set(
			virtualItems.map((virtualItem) => feeds[virtualItem.index].feedId)
		);
	}, [feeds, isFastScrolling, virtualItems]);

	const shouldRenderFeedPreview = (feed: FeedData) =>
		isFastScrolling &&
		feed.feedType === 'SCHEDULING' &&
		!feedIdsInVirtualRangeBeforeFastScrollRef.current.has(feed.feedId) &&
		!editingFeedIds.has(feed.feedId);

	return shouldRenderFeedPreview;
};

export default useFastScrollPreview;
