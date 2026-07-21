import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import postRegister from '@apis/user/postRegister';
import { useMutation } from '@tanstack/react-query';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';
import { NetworkError } from '@apis/NetworkError';
import { AUTH_ERROR_CODE, COMMON_ERROR_MESSAGE, VALIDATION_ERROR_CODE } from '@constants/api';
import { PATH } from '@constants/path';
import type { RegisterData } from '@apis/user/postRegister';

const REGISTER_MESSAGE = {
	SUCCESS: '회원가입에 성공했습니다',
	INVALID_FORMAT: '가입 형식을 확인해주세요',
	UNVERIFIED_MAIL: '인증된 메일이 아니거나 인증 정보가 만료됐습니다',
	DUPLICATED_MAIL: '이미 가입된 메일입니다',
	FAILED: '회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요',
} as const;

const useRegisterMutation = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();

	const navigate = useNavigate();

	const { mutate: mutateRegister, isPending } = useMutation({
		mutationFn: (data: RegisterData) => postRegister(data),
		onSuccess: () => {
			makeToast(REGISTER_MESSAGE.SUCCESS, 'Success');
			navigate(PATH.SIGNIN);
		},
		onError: (error: Error) => {
			if (error instanceof HTTPError) {
				switch (error.code) {
					case VALIDATION_ERROR_CODE:
						makeToast(REGISTER_MESSAGE.INVALID_FORMAT, 'Warning');
						break;
					case AUTH_ERROR_CODE.UNAUTHORIZED_OR_EXPIRED_VERIFY_TOKEN:
						makeToast(REGISTER_MESSAGE.UNVERIFIED_MAIL, 'Warning');
						break;
					case AUTH_ERROR_CODE.DUPLICATED_USER_EMAIL:
						makeToast(REGISTER_MESSAGE.DUPLICATED_MAIL, 'Warning');
						break;
					default:
						makeToast(REGISTER_MESSAGE.FAILED, 'Warning');
				}
			} else if (error instanceof NetworkError) {
				makeToast(COMMON_ERROR_MESSAGE.NETWORK, 'Warning');
			} else showBoundary(error);
		},
	});

	return { mutateRegister, isPending };
};
export default useRegisterMutation;
