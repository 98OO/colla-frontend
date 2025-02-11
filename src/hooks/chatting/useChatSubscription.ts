import { useEffect, useRef } from 'react';
import { queryClient } from '@hooks/queries/common/queryClient';
import { StompSubscription } from '@stomp/stompjs';
import useSocketStore from '@stores/socketStore';
import { END_POINTS } from '@constants/api';
import type { Message } from '@type/chat';
import type { UserInformation } from '@type/user';

export interface useChatSubscriptionProps {
	selectedChat: number;
	userStatus: UserInformation | undefined;
	handleCheckScroll: (parsedMessage: Message) => void;
}

const useChatSubscription = (props: useChatSubscriptionProps) => {
	const { selectedChat, userStatus, handleCheckScroll } = props;
	const chatSubscribeRef = useRef<StompSubscription | null>(null);
	const { stompClient } = useSocketStore();

	useEffect(() => {
		if (selectedChat && userStatus) {
			const newChatSubscribe = stompClient?.subscribe(
				END_POINTS.SUBSCRIBE(
					userStatus.profile.lastSeenTeamspaceId,
					selectedChat
				),
				(message) => {
					const parsedMessage = JSON.parse(message.body);
					stompClient?.send(
						END_POINTS.READ_MESSAGE(
							userStatus.profile.lastSeenTeamspaceId,
							selectedChat,
							parsedMessage.id
						)
					);

					handleCheckScroll(parsedMessage);
				}
			);

			if (newChatSubscribe) chatSubscribeRef.current = newChatSubscribe;
		}

		return () => {
			if (chatSubscribeRef.current) {
				chatSubscribeRef.current.unsubscribe();
				chatSubscribeRef.current = null;
			}

			queryClient.removeQueries({
				queryKey: ['chatMessage', selectedChat],
			});
		};
	}, [selectedChat, stompClient]);
};

export default useChatSubscription;
