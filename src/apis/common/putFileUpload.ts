import { axiosInstance } from '@apis/axiosInstance';

export interface FileUploadInfos {
	presignedURL: string;
	file: File;
	contentType: string;
}

const putFileUpload = async ({
	presignedURL,
	file,
	contentType,
}: FileUploadInfos) => {
	const response = await axiosInstance.put(presignedURL, file, {
		headers: {
			'Content-Type': contentType,
		},
		authRequired: false,
	});

	return response.data.content;
};

export default putFileUpload;
