import { useNavigate } from 'react-router-dom';
import { signIn } from '@apis/auth/sessionActions';
import postOauthLogin from '@apis/user/postOauthLogin';
import { useMutation } from '@tanstack/react-query';
import resolveServiceEntryPath from '@utils/auth/resolveServiceEntryPath';
import { PATH } from '@constants/path';
import { INVITE_URL_KEY } from '@constants/storage';

const useOauthLoginMutation = () => {
	const navigate = useNavigate();
	const inviteUrl = window.sessionStorage.getItem(INVITE_URL_KEY);

	const postOauthLoginMutation = useMutation({
		mutationFn: postOauthLogin,
		onSuccess: (content) => {
			signIn(content.accessToken, content.hasTeam);

			if (inviteUrl) {
				window.sessionStorage.removeItem(INVITE_URL_KEY);
				navigate(`${PATH.INVITE}${inviteUrl}`, { replace: true });
			} else {
				const serviceEntryPath = resolveServiceEntryPath(content.hasTeam);
				navigate(serviceEntryPath, { replace: true });
			}
		},
		onError: (error) => {
			throw error;
		},
	});
	return { mutatePostOauthLogin: postOauthLoginMutation.mutate };
};

export default useOauthLoginMutation;
