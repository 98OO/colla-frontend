import { type SyntheticEvent, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { configureFeedImages, restoreOriginalFeedImage } from '@utils/configureFeedImages';

interface SanitizedHtmlProps {
	html: string | null | undefined;
	optimizeFeedImages?: boolean;
	prioritizeImage?: boolean;
}

const SanitizedHtml = ({
	html,
	optimizeFeedImages = false,
	prioritizeImage = false,
}: SanitizedHtmlProps) => {
	const sanitizedHtml = useMemo(() => {
		if (!optimizeFeedImages) return DOMPurify.sanitize(html ?? '');

		const safeFragment = DOMPurify.sanitize(html ?? '', { RETURN_DOM_FRAGMENT: true });
		configureFeedImages(safeFragment, { prioritizeImage });

		const container = document.createElement('div');
		container.append(safeFragment);

		return container.innerHTML;
	}, [html, optimizeFeedImages, prioritizeImage]);

	const handleImageError = (event: SyntheticEvent<HTMLDivElement>) => {
		const { target } = event;
		if (!(target instanceof HTMLImageElement)) return;

		restoreOriginalFeedImage(target);
	};

	return (
		// eslint-disable-next-line react/no-danger
		<div onErrorCapture={handleImageError} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
	);
};

export default SanitizedHtml;
