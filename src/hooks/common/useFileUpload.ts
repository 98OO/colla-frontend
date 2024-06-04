import useFileUploadMutation from '@hooks/queries/common/useFileUploadMutation';
import useFileUploadUrlsMutation from '@hooks/queries/common/useFileUploadUrlsMutation';
import { FILE_SIZE_LIMIT } from '@constants/size';
import type { UrlRequest } from '@apis/common/postFileUploadUrls';

const useFileUpload = () => {
	const { mutateFileUploadUrls } = useFileUploadUrlsMutation();
	const { mutateFileUpload } = useFileUploadMutation();

	const uploadFiles = async (
		files: FileList,
		domainType: 'USER' | 'TEAMSPACE',
		teamspaceId?: number
	) => {
		const fileUploadDtos: UrlRequest[] = Array.from(files).map((file) => ({
			domainType,
			teamspaceId,
			originalAttachmentName: file.name,
		}));

		const response = await mutateFileUploadUrls(fileUploadDtos);

		if (response) {
			const { fileUploadUrlsDtos } = response;

			const fileUploadInfos = fileUploadUrlsDtos.map(
				({ presignedUrl }, index) => ({
					presignedURL: presignedUrl,
					file: files[index],
					contentType: files[index].type,
				})
			);

			try {
				await mutateFileUpload(fileUploadInfos);

				const attachmentUrls = fileUploadUrlsDtos.map(
					({ attachmentUrl }) => attachmentUrl
				);
				return attachmentUrls;
			} catch (error) {
				return null;
			}
		}

		return null;
	};

	const isFileSizeExceedLimit = (file: File): boolean => {
		const fileSizeInBytes = file.size;
		const maxFileSizeInBytes = FILE_SIZE_LIMIT;
		return fileSizeInBytes > maxFileSizeInBytes;
	};

	return { uploadFiles, isFileSizeExceedLimit };
};

export default useFileUpload;
