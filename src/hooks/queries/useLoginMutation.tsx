import { useNavigate } from 'react-router-dom';
import postLogin from '@apis/user/postLogin';
import { Stomp } from '@stomp/stompjs';
import { useMutation } from '@tanstack/react-query';
import SockJS from 'sockjs-client';
import useSocketStore from '@stores/socketStore';
import { WEBSOCKET_URL } from '@constants/api';
import { PATH } from '@constants/path';
import { ACCESS_TOKEN, INVITE_URL_KEY } from '@constants/storage';

const useLoginMutation = () => {
	const navigate = useNavigate();
	const inviteUrl = window.sessionStorage.getItem(INVITE_URL_KEY);
	const { setStompClient } = useSocketStore();

	const postLoginMutation = useMutation({
		mutationFn: postLogin,
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

	return { mutatePostLogin: postLoginMutation.mutateAsync };
};
export default useLoginMutation;
