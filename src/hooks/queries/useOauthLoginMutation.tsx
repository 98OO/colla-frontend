import { useNavigate } from 'react-router-dom';
import postOauthLogin from '@apis/user/postOauthLogin';
import { Stomp } from '@stomp/stompjs';
import { useMutation } from '@tanstack/react-query';
import SockJS from 'sockjs-client';
import useSocketStore from '@stores/socketStore';
import { WEBSOCKET_URL } from '@constants/api';
import { PATH } from '@constants/path';
import { ACCESS_TOKEN, INVITE_URL_KEY } from '@constants/storage';

const useOauthLoginMutation = () => {
	const navigate = useNavigate();
	const inviteUrl = window.sessionStorage.getItem(INVITE_URL_KEY);
	const { setStompClient } = useSocketStore();

	const postOauthLoginMutation = useMutation({
		mutationFn: postOauthLogin,
		onSuccess: (content) => {
			localStorage.setItem(ACCESS_TOKEN, content.accessToken);
			const client = Stomp.over(function () {
				return new SockJS(`${WEBSOCKET_URL}${localStorage.getItem(ACCESS_TOKEN)}`);
			});

			client.connect({}, () => {
				setStompClient(client);
			});

			client.debug = () => {};

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
	return { mutatePostOauthLogin: postOauthLoginMutation.mutate };
};

export default useOauthLoginMutation;
