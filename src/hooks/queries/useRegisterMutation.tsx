import { useNavigate } from 'react-router-dom';
import postRegister from '@apis/user/postRegister';
import { useMutation } from '@tanstack/react-query';
import { PATH } from '@constants/path';

const useRegisterMutation = () => {
	const navigate = useNavigate();

	const postRegisterMutation = useMutation({
		mutationFn: postRegister,
		onSuccess: () => {
			navigate(PATH.SIGNIN);
		},
		onError: (error) => {
			throw error;
		},
	});

	return { mutatePostRegister: postRegisterMutation.mutateAsync };
};
export default useRegisterMutation;
