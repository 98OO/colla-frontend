import { useEffect } from 'react';
import useIntersectionObserver from '@hooks/common/useIntersectionObserver';
import { FEED_INFINITE_SCROLL_PRELOAD_DISTANCE } from '@constants/feed';
import * as S from './NextPageTrigger.styled';

const PRELOAD_ROOT_MARGIN = `0px 0px ${FEED_INFINITE_SCROLL_PRELOAD_DISTANCE}px 0px`;

interface NextPageTriggerProps {
	scrollContainer: HTMLElement;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	isQueryError: boolean;
	fetchNextPage: (options: { cancelRefetch: boolean }) => Promise<unknown>;
}

const NextPageTrigger = ({
	scrollContainer,
	hasNextPage,
	isFetchingNextPage,
	isQueryError,
	fetchNextPage,
}: NextPageTriggerProps) => {
	const { targetRef: sentinelRef, isIntersecting } = useIntersectionObserver({
		root: scrollContainer,
		rootMargin: PRELOAD_ROOT_MARGIN,
		enabled: hasNextPage,
	});

	useEffect(() => {
		if (!isIntersecting || !hasNextPage || isFetchingNextPage || isQueryError) return;

		fetchNextPage({ cancelRefetch: false });
	}, [fetchNextPage, hasNextPage, isFetchingNextPage, isIntersecting, isQueryError]);

	return <S.Sentinel ref={sentinelRef} />;
};

export default NextPageTrigger;
