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
			'Content-Disposition': `attachment; filename="${file.name}"; filename*=UTF-8''${encodeURIComponent(file.name)}`,
		},
		authRequired: false,
	});

	return response.data.content;
};

export default putFileUpload;
