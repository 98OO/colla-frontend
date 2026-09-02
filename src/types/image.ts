interface ImageOptimizationRequest {
	file: File;
	maxDimension: number;
	quality: number;
	outputType: string;
}

type ImageOptimizationResponse = { status: 'success'; blob: Blob } | { status: 'error' };

export type { ImageOptimizationRequest, ImageOptimizationResponse };
