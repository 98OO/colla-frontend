import { startTransition, useEffect, useState } from 'react';

const scheduleAfterNextPaint = (callback: () => void) => {
	let callbackFrameId: number | undefined;

	const nextPaintFrameId = requestAnimationFrame(() => {
		callbackFrameId = requestAnimationFrame(callback);
	});

	return () => {
		cancelAnimationFrame(nextPaintFrameId);
		if (callbackFrameId !== undefined) cancelAnimationFrame(callbackFrameId);
	};
};

const usePreviewTransition = (shouldRenderPreview: boolean) => {
	const [shouldKeepPreview, setShouldKeepPreview] = useState(shouldRenderPreview);
	const [shouldRenderFeed, setShouldRenderFeed] = useState(!shouldRenderPreview);

	useEffect(() => {
		if (shouldRenderPreview) {
			setShouldKeepPreview(true);
			setShouldRenderFeed(false);
			return;
		}

		startTransition(() => setShouldRenderFeed(true));
	}, [shouldRenderPreview]);

	useEffect(() => {
		if (shouldRenderPreview || !shouldRenderFeed || !shouldKeepPreview) return undefined;

		return scheduleAfterNextPaint(() => setShouldKeepPreview(false));
	}, [shouldKeepPreview, shouldRenderFeed, shouldRenderPreview]);

	return { shouldKeepPreview, shouldRenderFeed };
};

export default usePreviewTransition;
