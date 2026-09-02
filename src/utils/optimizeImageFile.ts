import type { ImageOptimizationRequest, ImageOptimizationResponse } from '@type/image';

const SUPPORTED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_DIMENSION = 1600;
const WEBP_QUALITY = 0.82;
const WEBP_TYPE = 'image/webp';
const MIN_SIZE_REDUCTION_RATIO = 0.1;

const supportsImageOptimization = () => {
	return (
		typeof Worker !== 'undefined' &&
		typeof OffscreenCanvas !== 'undefined' &&
		typeof createImageBitmap !== 'undefined'
	);
};

const runImageOptimizationWorker = (
	request: ImageOptimizationRequest
): Promise<ImageOptimizationResponse> => {
	const worker = new Worker(new URL('../workers/imageOptimization.worker.ts', import.meta.url), {
		type: 'module',
	});

	return new Promise((resolve, reject) => {
		let isSettled = false;

		const settle = (callback: () => void) => {
			if (isSettled) return;

			isSettled = true;
			worker.terminate();
			callback();
		};

		worker.onmessage = (event: MessageEvent<ImageOptimizationResponse>) => {
			settle(() => resolve(event.data));
		};
		worker.onerror = (event) => {
			settle(() => reject(event.error ?? new Error(event.message)));
		};
		worker.onmessageerror = () => {
			settle(() => reject(new Error('Image optimization response could not be read.')));
		};

		try {
			worker.postMessage(request);
		} catch (error) {
			settle(() => reject(error));
		}
	});
};

const createWebpFileName = (fileName: string) => {
	const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');
	return `${nameWithoutExtension}.webp`;
};

const hasEnoughSizeReduction = (originalSize: number, optimizedSize: number) => {
	return originalSize - optimizedSize >= originalSize * MIN_SIZE_REDUCTION_RATIO;
};

const optimizeImageFile = async (file: File): Promise<File> => {
	if (!SUPPORTED_IMAGE_TYPES.has(file.type) || !supportsImageOptimization()) return file;

	try {
		const response = await runImageOptimizationWorker({
			file,
			maxDimension: MAX_DIMENSION,
			quality: WEBP_QUALITY,
			outputType: WEBP_TYPE,
		});

		if (response.status === 'error' || !hasEnoughSizeReduction(file.size, response.blob.size)) {
			return file;
		}

		return new File([response.blob], createWebpFileName(file.name), {
			type: WEBP_TYPE,
			lastModified: file.lastModified,
		});
	} catch {
		return file;
	}
};

export default optimizeImageFile;
