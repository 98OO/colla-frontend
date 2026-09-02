import { useRef } from 'react';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { FeedData } from '@type/feed';

interface UsePriorityImageFeedIdParams {
	feeds: FeedData[];
	virtualItems: VirtualItem[];
	scrollContainer: HTMLElement;
}

interface PriorityImageState {
	initialFeedId: number | null;
	priorityFeedId: number | null;
	hasSearched: boolean;
}

const findFirstInViewImageFeedId = ({
	feeds,
	virtualItems,
	scrollContainer,
}: UsePriorityImageFeedIdParams) => {
	const viewportStart = scrollContainer.scrollTop;
	const viewportEnd = viewportStart + scrollContainer.clientHeight;
	const visibleImageItem = virtualItems.find(({ index, start, end }) => {
		const isInViewport = start < viewportEnd && end > viewportStart;

		return isInViewport && feeds[index].images.length > 0;
	});

	return visibleImageItem ? feeds[visibleImageItem.index].feedId : null;
};

const usePriorityImageFeedId = ({
	feeds,
	virtualItems,
	scrollContainer,
}: UsePriorityImageFeedIdParams) => {
	const currentInitialFeedId = feeds[0]?.feedId ?? null;
	const priorityStateRef = useRef<PriorityImageState>({
		initialFeedId: currentInitialFeedId,
		priorityFeedId: null,
		hasSearched: false,
	});

	const hasFeedListChanged = priorityStateRef.current.initialFeedId !== currentInitialFeedId;
	if (hasFeedListChanged) {
		priorityStateRef.current = {
			initialFeedId: currentInitialFeedId,
			priorityFeedId: null,
			hasSearched: false,
		};
	}

	const isViewportReady = virtualItems.length > 0 && scrollContainer.clientHeight > 0;
	if (!priorityStateRef.current.hasSearched && isViewportReady) {
		priorityStateRef.current = {
			initialFeedId: currentInitialFeedId,
			priorityFeedId: findFirstInViewImageFeedId({
				feeds,
				virtualItems,
				scrollContainer,
			}),
			hasSearched: true,
		};
	}

	return priorityStateRef.current.priorityFeedId;
};

export default usePriorityImageFeedId;
