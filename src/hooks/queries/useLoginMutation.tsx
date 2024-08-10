import { useNavigate } from 'react-router-dom';
import postLogin from '@apis/user/postLogin';
import { Stomp } from '@stomp/stompjs';
import { useMutation } from '@tanstack/react-query';
import SockJS from 'sockjs-client';
import useSocketStore from '@stores/socketStore';
import { ACCESS_TOKEN, INVITE_URL } from '@constants/api';
import { PATH } from '@constants/path';

const useLoginMutation = () => {
	const navigate = useNavigate();
	const inviteUrl = window.sessionStorage.getItem(INVITE_URL);
	const { setStompClient } = useSocketStore();

	const postLoginMutation = useMutation({
		mutationFn: postLogin,
		onSuccess: (content) => {
			localStorage.setItem(ACCESS_TOKEN, content.accessToken);
			const client = Stomp.over(function () {
				return new SockJS(
					`https://api.colla.so/ws-stomp?accessToken=${localStorage.getItem(ACCESS_TOKEN)}`
				);
			});

			client.connect({}, () => {
				setStompClient(client);
			});
			if (inviteUrl) {
				window.sessionStorage.removeItem(INVITE_URL);
				navigate(`${PATH.INVITE}${inviteUrl}`);
			} else if (content.hasTeam) {
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
