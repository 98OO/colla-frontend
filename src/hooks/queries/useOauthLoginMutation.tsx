import { useNavigate } from 'react-router-dom';
import postOauthLogin from '@apis/user/postOauthLogin';
import { useMutation } from '@tanstack/react-query';
import { ACCESS_TOKEN } from '@constants/api';
import { PATH } from '@constants/path';

const useOauthLoginMutation = () => {
	const navigate = useNavigate();

	const postOauthLoginMutation = useMutation({
		mutationFn: postOauthLogin,
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
	return { mutatePostOauthLogin: postOauthLoginMutation.mutate };
};

export default useOauthLoginMutation;
