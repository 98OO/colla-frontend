import { useEffect, useRef, useState } from 'react';

const FAST_SCROLL_MIN_VELOCITY = 5;
const FAST_SCROLL_MIN_EVENT_COUNT = 2;
const FAST_SCROLL_END_DELAY = 120;

const useFastScroll = (scrollElement: HTMLElement | null) => {
	const [isFastScrolling, setIsFastScrolling] = useState(false);

	const lastScrollTopRef = useRef(0);
	const lastTimestampRef = useRef(0);
	const consecutiveFastScrollCountRef = useRef(0);

	useEffect(() => {
		if (!scrollElement) return undefined;

		let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;

		lastScrollTopRef.current = scrollElement.scrollTop;
		lastTimestampRef.current = performance.now();

		const handleScroll = () => {
			const timestamp = performance.now();
			const elapsedTime = timestamp - lastTimestampRef.current;
			const distance = Math.abs(scrollElement.scrollTop - lastScrollTopRef.current);
			const velocity = elapsedTime > 0 ? distance / elapsedTime : 0;

			consecutiveFastScrollCountRef.current =
				velocity >= FAST_SCROLL_MIN_VELOCITY ? consecutiveFastScrollCountRef.current + 1 : 0;

			if (consecutiveFastScrollCountRef.current >= FAST_SCROLL_MIN_EVENT_COUNT) {
				setIsFastScrolling(true);
			}

			if (scrollEndTimer) clearTimeout(scrollEndTimer);

			scrollEndTimer = setTimeout(() => {
				consecutiveFastScrollCountRef.current = 0;
				setIsFastScrolling(false);
			}, FAST_SCROLL_END_DELAY);

			lastScrollTopRef.current = scrollElement.scrollTop;
			lastTimestampRef.current = timestamp;
		};

		scrollElement.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			scrollElement.removeEventListener('scroll', handleScroll);
			if (scrollEndTimer) clearTimeout(scrollEndTimer);
		};
	}, [scrollElement]);

	return isFastScrolling;
};

export default useFastScroll;
