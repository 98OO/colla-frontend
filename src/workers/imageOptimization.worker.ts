import type { ImageOptimizationRequest, ImageOptimizationResponse } from '@type/image';

const calculateOutputSize = (width: number, height: number, maxDimension: number) => {
	const scale = Math.min(1, maxDimension / Math.max(width, height));

	return {
		width: Math.round(width * scale),
		height: Math.round(height * scale),
	};
};

globalThis.onmessage = async (event: MessageEvent<ImageOptimizationRequest>) => {
	const { file, maxDimension, quality, outputType } = event.data;
	let imageBitmap: ImageBitmap | null = null;

	try {
		imageBitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });

		const outputSize = calculateOutputSize(imageBitmap.width, imageBitmap.height, maxDimension);
		const canvas = new OffscreenCanvas(outputSize.width, outputSize.height);
		const context = canvas.getContext('2d');

		if (!context) throw new Error('Canvas context is unavailable.');

		context.drawImage(imageBitmap, 0, 0, outputSize.width, outputSize.height);

		const blob = await canvas.convertToBlob({ type: outputType, quality });
		const response: ImageOptimizationResponse = { status: 'success', blob };

		globalThis.postMessage(response);
	} catch {
		const response: ImageOptimizationResponse = { status: 'error' };

		globalThis.postMessage(response);
	} finally {
		imageBitmap?.close();
	}
};

export {};
