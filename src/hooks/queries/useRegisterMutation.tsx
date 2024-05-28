import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import postRegister from '@apis/user/postRegister';
import { useMutation } from '@hooks/queries/common/useMutation';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';
import { PATH } from '@constants/path';
import type { RegisterData } from '@apis/user/postRegister';

const useRegisterMutation = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();
	const navigate = useNavigate();

	const handleRegisterError = (error: Error) => {
		if (error instanceof HTTPError) {
			if (error.code === 30001) {
				makeToast('가입 형식을 확인해주세요', 'Warning');
			} else if (error.code === 40103) {
				makeToast('인증된 메일이 아니거나 인증 정보가 만료됐습니다', 'Warning');
			} else if (error.code === 40104) {
				makeToast('이미 가입된 메일입니다', 'Warning');
			}
		} else showBoundary(error);
	};

	const { mutate } = useMutation({
		onSuccess: () => {
			makeToast('회원가입 성공', 'Success');
			navigate(PATH.SIGNIN);
		},
		onError: handleRegisterError,
	});

	const mutateRegister = async (data: RegisterData) => {
		mutate(() => postRegister(data));
	};

	return { mutateRegister };
};
export default useRegisterMutation;
