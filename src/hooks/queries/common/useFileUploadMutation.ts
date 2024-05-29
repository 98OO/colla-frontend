import { useErrorBoundary } from 'react-error-boundary';
import putFileUpload from '@apis/common/putFileUpload';
import { useMutation } from '@hooks/queries/common/useMutation';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';
import type { FileUploadInfos } from '@apis/common/putFileUpload';

const useFileUploadMutation = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();

	const handleFileUploadError = (error: Error) => {
		if (error instanceof HTTPError) {
			makeToast('파일 업로드 중 오류가 발생했습니다', 'Warning');
		} else showBoundary(error);
	};

	const { mutate } = useMutation({
		onSuccess: () => {},
		onError: handleFileUploadError,
	});

	const mutateFileUpload = async (fileUploadInfos: FileUploadInfos[]) => {
		const uploadPromises = fileUploadInfos.map((fileUploadInfo) => {
			return mutate(() => putFileUpload(fileUploadInfo));
		});
		await Promise.all(uploadPromises);
	};

	return { mutateFileUpload };
};

export default useFileUploadMutation;
