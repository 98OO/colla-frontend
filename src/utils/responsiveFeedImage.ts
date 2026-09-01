import { IMAGE_SOURCE_HOSTNAME, IMAGE_TRANSFORM_BASE_URL } from '@constants/api';

const FEED_IMAGE_QUALITY = 85;
const SUPPORTED_IMAGE_PATH_PATTERN = /\.(?:avif|jpe?g|png|webp)$/i;

const FEED_IMAGE_PRESETS = {
	feed: {
		widths: [680, 960, 1360],
		sizes: '(max-width: 680px) 98vw, 620px',
	},
	thumbnail: {
		widths: [40, 80],
		sizes: '40px',
	},
} as const;

type FeedImagePreset = keyof typeof FEED_IMAGE_PRESETS;

interface ResponsiveFeedImage {
	src: string;
	srcSet: string;
	sizes: string;
}

const parseTransformableFeedImageUrl = (sourceUrl: string) => {
	try {
		const parsedUrl = new URL(sourceUrl);

		if (parsedUrl.protocol !== 'https:') return null;
		if (parsedUrl.hostname !== IMAGE_SOURCE_HOSTNAME) return null;
		if (parsedUrl.search || parsedUrl.hash) return null;
		if (!SUPPORTED_IMAGE_PATH_PATTERN.test(parsedUrl.pathname)) return null;

		return parsedUrl;
	} catch {
		return null;
	}
};

const createFeedImageTransformUrl = (sourceUrl: string, width: number) => {
	const options = `width=${width},fit=scale-down,quality=${FEED_IMAGE_QUALITY},format=auto`;

	return `${IMAGE_TRANSFORM_BASE_URL}/${options}/${sourceUrl}`;
};

export const getResponsiveFeedImage = (
	sourceUrl: string,
	preset: FeedImagePreset = 'feed'
): ResponsiveFeedImage | null => {
	const parsedUrl = parseTransformableFeedImageUrl(sourceUrl);
	if (!parsedUrl) return null;

	const { widths, sizes } = FEED_IMAGE_PRESETS[preset];
	const normalizedSourceUrl = parsedUrl.toString();

	const responsiveImageSources = widths.map((width) => ({
		width,
		url: createFeedImageTransformUrl(normalizedSourceUrl, width),
	}));
	const [defaultImageSource] = responsiveImageSources;
	const srcSet = responsiveImageSources.map(({ width, url }) => `${url} ${width}w`).join(', ');

	return {
		src: defaultImageSource.url,
		srcSet,
		sizes,
	};
};
