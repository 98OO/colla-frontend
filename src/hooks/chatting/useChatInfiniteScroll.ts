import { useEffect, useLayoutEffect, useRef } from 'react';
import useIntersectionObserver from '@hooks/common/useIntersectionObserver';

interface UseChatInfiniteScrollProps {
	chatContainer: HTMLDivElement | null;
	hasNextPage: boolean | undefined;
	isFetchingNextPage: boolean;
	isInitialScrollComplete: boolean;
	paginationVersion: number;
	fetchNextPage: (options?: { throwOnError?: boolean }) => Promise<unknown>;
}

const useChatInfiniteScroll = ({
	chatContainer,
	hasNextPage,
	isFetchingNextPage,
	isInitialScrollComplete,
	paginationVersion,
	fetchNextPage,
}: UseChatInfiniteScrollProps) => {
	const previousScrollHeightRef = useRef(0);
	const previousScrollTopRef = useRef(0);
	const shouldRestoreScrollRef = useRef(false);
	const { targetRef, isIntersecting } = useIntersectionObserver({
		root: chatContainer,
		rootMargin: '100px 0px 0px',
		enabled: !!chatContainer && isInitialScrollComplete,
	});

	useEffect(() => {
		if (
			!chatContainer ||
			!isIntersecting ||
			!hasNextPage ||
			isFetchingNextPage ||
			shouldRestoreScrollRef.current ||
			chatContainer.scrollHeight <= chatContainer.clientHeight
		) {
			return;
		}

		previousScrollHeightRef.current = chatContainer.scrollHeight;
		previousScrollTopRef.current = chatContainer.scrollTop;
		shouldRestoreScrollRef.current = true;

		fetchNextPage({ throwOnError: true }).catch(() => {
			shouldRestoreScrollRef.current = false;
		});
	}, [chatContainer, fetchNextPage, hasNextPage, isFetchingNextPage, isIntersecting]);

	useLayoutEffect(() => {
		if (!chatContainer || !shouldRestoreScrollRef.current) return;

		const scrollElement = chatContainer;
		const addedHeight = scrollElement.scrollHeight - previousScrollHeightRef.current;

		scrollElement.scrollTop = previousScrollTopRef.current + addedHeight;
		shouldRestoreScrollRef.current = false;
	}, [chatContainer, paginationVersion]);

	return { topSentinelRef: targetRef };
};

export default useChatInfiniteScroll;
