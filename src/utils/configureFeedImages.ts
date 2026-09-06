import { getResponsiveFeedImage } from '@utils/responsiveFeedImage';

const ORIGINAL_SOURCE_ATTRIBUTE = 'data-original-src';

interface FeedImageOptions {
	prioritizeImage: boolean;
}

const configureFeedImageLoading = (image: HTMLImageElement, isPriorityImage: boolean) => {
	if (isPriorityImage) {
		image.setAttribute('loading', 'eager');
		image.setAttribute('fetchpriority', 'high');
		return;
	}

	image.setAttribute('loading', 'lazy');
	image.setAttribute('decoding', 'async');
	image.removeAttribute('fetchpriority');
};

export const configureFeedImages = (
	container: ParentNode,
	{ prioritizeImage }: FeedImageOptions
) => {
	const images = Array.from(container.querySelectorAll('img'));

	images.forEach((image, index) => {
		const isPriorityImage = prioritizeImage && index === 0;
		configureFeedImageLoading(image, isPriorityImage);

		const originalSource = image.getAttribute('src');
		if (!originalSource) return;

		const responsiveImage = getResponsiveFeedImage(originalSource);
		if (!responsiveImage) return;

		image.setAttribute(ORIGINAL_SOURCE_ATTRIBUTE, originalSource);
		image.setAttribute('src', responsiveImage.src);
		image.setAttribute('srcset', responsiveImage.srcSet);
		image.setAttribute('sizes', responsiveImage.sizes);
	});
};

export const restoreOriginalFeedImage = (image: HTMLImageElement) => {
	const originalSource = image.getAttribute(ORIGINAL_SOURCE_ATTRIBUTE);
	if (!originalSource) return false;

	image.removeAttribute(ORIGINAL_SOURCE_ATTRIBUTE);
	image.removeAttribute('srcset');
	image.removeAttribute('sizes');
	image.setAttribute('src', originalSource);

	return true;
};
