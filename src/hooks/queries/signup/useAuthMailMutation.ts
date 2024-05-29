import { useErrorBoundary } from 'react-error-boundary';
import postAuthMail from '@apis/user/postAuthMail';
import { useMutation } from '@hooks/queries/common/useMutation';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';

const useAuthMailMutation = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();

	const handleAuthMailError = (error: Error) => {
		if (error instanceof HTTPError) {
			makeToast('인증 메일 전송을 실패했습니다. 다시 시도해주세요', 'Warning');
		} else showBoundary(error);
	};

	const { mutate } = useMutation({
		onSuccess: () => makeToast('인증 메일을 보냈습니다', 'Success'),
		onError: handleAuthMailError,
	});

	const mutateAuthMail = async (email: string) => {
		await mutate(() => postAuthMail(email));
	};

	return { mutateAuthMail };
};
export default useAuthMailMutation;
