import { useErrorBoundary } from 'react-error-boundary';
import getMailDuplication from '@apis/user/getMailDuplication';
import { useMutation } from '@hooks/queries/common/useMutation';
import useAuthMailMutation from '@hooks/queries/signup/useAuthMailMutation';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';

const useDuplicationMutation = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();
	const { mutateAuthMail } = useAuthMailMutation();

	const handleDuplicationError = (error: Error) => {
		if (error instanceof HTTPError && error.code === 40104) {
			makeToast('이미 가입된 메일입니다', 'Warning');
		} else showBoundary(error);
	};

	const { mutate } = useMutation({
		onSuccess: (email: string) => mutateAuthMail(email),
		onError: handleDuplicationError,
	});

	const mutateDuplication = async (email: string) => {
		await mutate(() => getMailDuplication(email));
	};

	return { mutateDuplication };
};
export default useDuplicationMutation;
