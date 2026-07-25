import { useNavigate } from 'react-router-dom';
import { signIn } from '@apis/auth/sessionActions';
import postLogin from '@apis/user/postLogin';
import { useMutation } from '@tanstack/react-query';
import { PATH } from '@constants/path';
import { INVITE_URL_KEY } from '@constants/storage';

const useLoginMutation = () => {
	const navigate = useNavigate();
	const inviteUrl = window.sessionStorage.getItem(INVITE_URL_KEY);

	const postLoginMutation = useMutation({
		mutationFn: postLogin,
		onSuccess: (content) => {
			signIn(content.accessToken);

			if (inviteUrl) {
				window.sessionStorage.removeItem(INVITE_URL_KEY);
				navigate(`${PATH.INVITE}${inviteUrl}`, { replace: true });
			} else if (content.hasTeam) {
				navigate(PATH.FEED, { replace: true });
			} else {
				navigate(PATH.ENTRY, { replace: true });
			}
		},
		onError: (error) => {
			throw error;
		},
	});

	return { mutatePostLogin: postLoginMutation.mutateAsync };
};
export default useLoginMutation;
