import { useErrorBoundary } from 'react-error-boundary';
import postMailVerification from '@apis/user/postMailVerification';
import { useMutation } from '@hooks/queries/common/useMutation';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';

const useVerificationMutation = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();

	const handleVerificationError = (error: Error) => {
		if (error instanceof HTTPError) {
			if (error.code === 30001 || error.code === 40101) {
				makeToast('인증번호 확인 후 다시 시도해주세요', 'Warning');
			}
		} else showBoundary(error);
	};

	const { mutate } = useMutation({
		onSuccess: () => makeToast('이메일 인증을 성공했습니다.', 'Success'),
		onError: handleVerificationError,
	});

	const mutateVerification = async (email: string, verifyCode: string) => {
		await mutate(() => postMailVerification(email, verifyCode));
	};

	return { mutateVerification };
};
export default useVerificationMutation;
