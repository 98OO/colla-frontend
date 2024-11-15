import { useLayoutEffect, useState, useRef } from 'react';

const useMeasureWidth = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [width, setWidth] = useState<number>(0);

	useLayoutEffect(() => {
		const measureWidth = () => {
			if (ref.current) {
				const rect = ref.current.getBoundingClientRect();
				setWidth(rect.width);
			}
		};

		measureWidth();

		window.addEventListener('resize', measureWidth);

		return () => {
			window.removeEventListener('resize', measureWidth);
		};
	}, [ref.current]);

	return { ref, width };
};

export default useMeasureWidth;
