import { axiosInstance } from '@apis/axiosInstance';
import { FILE_UPLOAD_TIMEOUT } from '@constants/api';

export interface FileUploadInfos {
	presignedURL: string;
	file: File;
	contentType: string;
}

const putFileUpload = async ({ presignedURL, file, contentType }: FileUploadInfos) => {
	const response = await axiosInstance.put(presignedURL, file, {
		headers: {
			'Content-Type': contentType,
			'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(file.name)}`,
		},
		skipAuthorizationHeader: true,
		withCredentials: false,
		timeout: FILE_UPLOAD_TIMEOUT,
	});

	return response.data.content;
};

export default putFileUpload;
