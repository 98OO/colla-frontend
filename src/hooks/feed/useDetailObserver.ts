import { useState, useEffect, useRef } from 'react';
import { FEED_DETAIL_MAX_HEIGHT } from '@styles/layout';

const useDetailObserver = (content?: string) => {
	const [showMoreButton, setShowMoreButton] = useState(false);
	const detailRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new ResizeObserver(() => {
			if (!detailRef.current) return;

			setShowMoreButton(
				detailRef.current.scrollHeight > FEED_DETAIL_MAX_HEIGHT
			);
		});

		if (detailRef.current) {
			observer.observe(detailRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [content]);

	return { showMoreButton, detailRef };
};

export default useDetailObserver;
