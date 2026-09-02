import { useState, useEffect, useRef } from 'react';
import { FEED_DETAIL_MAX_HEIGHT } from '@styles/layout';

const useDetailObserver = (content?: string) => {
	const [showMoreButton, setShowMoreButton] = useState(false);
	const detailRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const detailElement = detailRef.current;
		const contentElement = detailElement?.firstElementChild;
		if (!detailElement || !contentElement) return undefined;

		const updateShowMoreButton = () => {
			setShowMoreButton(detailElement.scrollHeight > FEED_DETAIL_MAX_HEIGHT);
		};
		const observer = new ResizeObserver(updateShowMoreButton);

		observer.observe(contentElement);
		updateShowMoreButton();

		return () => {
			observer.disconnect();
		};
	}, [content]);

	return { showMoreButton, detailRef };
};

export default useDetailObserver;
