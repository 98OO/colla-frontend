import { useLayoutEffect, useState, useRef } from 'react';

const useMeasureWidth = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const measuredWidthRef = useRef(0);
	const [width, setWidth] = useState<number>(0);

	useLayoutEffect(() => {
		const measureWidth = () => {
			if (ref.current) {
				const rect = ref.current.getBoundingClientRect();
				if (measuredWidthRef.current === rect.width) return;

				measuredWidthRef.current = rect.width;
				setWidth(rect.width);
			}
		};

		measureWidth();

		window.addEventListener('resize', measureWidth);

		return () => {
			window.removeEventListener('resize', measureWidth);
		};
	}, []);

	return { ref, width };
};

export default useMeasureWidth;
