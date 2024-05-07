import { useNavigate } from 'react-router-dom';
import postOauthLogin from '@apis/user/postOauthLogin';
import { useMutation } from '@tanstack/react-query';
import useUserStore from '@stores/userStore';
import { ACCESS_TOKEN } from '@constants/api';
import { PATH } from '@constants/path';

const useOauthLoginMutation = () => {
	const { userInfo, setUserInfo } = useUserStore();
	const navigate = useNavigate();

	const postOauthLoginMutation = useMutation({
		mutationFn: postOauthLogin,
		onSuccess: (content) => {
			if (content.hasTeam) {
				localStorage.setItem(ACCESS_TOKEN, content.accessToken);
				setUserInfo({
					...userInfo!,
					userId: content.userId,
				});
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
