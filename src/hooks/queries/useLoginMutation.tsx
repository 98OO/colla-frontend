import { useNavigate } from 'react-router-dom';
import postLogin from '@apis/user/postLogin';
import { useMutation } from '@tanstack/react-query';
import { ACCESS_TOKEN } from '@constants/api';
import { PATH } from '@constants/path';

const useLoginMutation = () => {
	const navigate = useNavigate();

	const postLoginMutation = useMutation({
		mutationFn: postLogin,
		onSuccess: (content) => {
			localStorage.setItem(ACCESS_TOKEN, content.accessToken);
			if (content.hasTeam) {
				navigate(PATH.FEED);
			} else {
				navigate(PATH.ENTRY);
			}
		},
		onError: (error) => {
			throw error;
		},
	});

	return { mutatePostLogin: postLoginMutation.mutateAsync };
};
export default useLoginMutation;
