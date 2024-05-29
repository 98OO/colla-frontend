import { useErrorBoundary } from 'react-error-boundary';
import {
	postFileUploadUrls,
	UrlRequest,
	UrlResponse,
} from '@apis/common/postFileUploadUrls';
import { useMutation } from '@hooks/queries/common/useMutation';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';

const useFileUploadUrlsMutation = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();

	const handlePresignedURLError = (error: Error) => {
		if (error instanceof HTTPError) {
			makeToast('파일 업로드 중 오류가 발생했습니다', 'Warning');
		} else showBoundary(error);
	};

	const { mutate } = useMutation<UrlResponse>({
		onSuccess: () => {},
		onError: handlePresignedURLError,
	});

	const mutateFileUploadUrls = async (fileUploadDtos: UrlRequest[]) => {
		return mutate(() => postFileUploadUrls(fileUploadDtos));
	};

	return { mutateFileUploadUrls };
};

export default useFileUploadUrlsMutation;
