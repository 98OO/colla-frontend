import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

export interface UrlRequest {
	domainType: 'USER' | 'TEAMSPACE';
	teamspaceId?: number;
	originalAttachmentName: string;
}

export interface Urls {
	presignedUrl: string;
	attachmentUrl: string;
}

export interface UrlResponse {
	fileUploadUrlsDtos: Urls[];
}

export const postFileUploadUrls = async (
	fileUploadDtos: UrlRequest[]
): Promise<UrlResponse> => {
	const response = await axiosInstance.post(END_POINTS.PRESIGNED, {
		fileUploadDtos,
	});

	return response.data.content;
};
