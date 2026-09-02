import { useCallback } from 'react';
import useFileUploadMutation from '@hooks/queries/common/useFileUploadMutation';
import useFileUploadUrlsMutation from '@hooks/queries/common/useFileUploadUrlsMutation';
import { FILE_SIZE_LIMIT } from '@constants/size';
import type { UrlRequest } from '@apis/common/postFileUploadUrls';

const useFileUpload = () => {
	const { mutateFileUploadUrls } = useFileUploadUrlsMutation();
	const { mutateFileUpload } = useFileUploadMutation();

	const uploadFiles = useCallback(
		async (files: FileList | File[], domainType: 'USER' | 'TEAMSPACE', teamspaceId?: number) => {
			if (!files.length) return [];

			const fileUploadDtos: UrlRequest[] = Array.from(files).map((file) => ({
				domainType,
				teamspaceId,
				originalAttachmentName: file.name,
			}));

			const response = await mutateFileUploadUrls(fileUploadDtos);

			if (response) {
				const { fileUploadUrlsDtos } = response;

				const fileUploadInfos = fileUploadUrlsDtos.map(({ presignedUrl }, index) => ({
					presignedURL: presignedUrl,
					file: files[index],
					contentType: files[index].type,
				}));

				try {
					await mutateFileUpload(fileUploadInfos);

					return fileUploadUrlsDtos.map(({ attachmentUrl }) => attachmentUrl);
				} catch {
					return null;
				}
			}

			return null;
		},
		[mutateFileUpload, mutateFileUploadUrls]
	);

	const isFileSizeExceedLimit = useCallback((file: File): boolean => {
		const fileSizeInBytes = file.size;
		const maxFileSizeInBytes = FILE_SIZE_LIMIT;
		return fileSizeInBytes > maxFileSizeInBytes;
	}, []);

	return { uploadFiles, isFileSizeExceedLimit };
};

export default useFileUpload;
