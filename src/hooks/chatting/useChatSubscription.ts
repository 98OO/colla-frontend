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
	const { stompClient, stompConnectionVersion } = useSocketStore();
	const latestConnectionVersionRef = useRef(stompConnectionVersion);

	latestConnectionVersionRef.current = stompConnectionVersion;

	useEffect(() => {
		const subscribedConnectionVersion = stompConnectionVersion;

		if (selectedChat && userStatus) {
			const newChatSubscribe = stompClient?.subscribe(
				END_POINTS.SUBSCRIBE(userStatus.profile.lastSeenTeamspaceId, selectedChat),
				(message) => {
					const parsedMessage = JSON.parse(message.body);
					stompClient?.publish({
						destination: END_POINTS.READ_MESSAGE(
							userStatus.profile.lastSeenTeamspaceId,
							selectedChat,
							parsedMessage.id
						),
					});

					handleCheckScroll(parsedMessage);
				}
			);

			if (newChatSubscribe) chatSubscribeRef.current = newChatSubscribe;

			if (stompConnectionVersion > 1) {
				queryClient.resetQueries({
					queryKey: ['chatMessage', selectedChat, userStatus.profile.lastSeenTeamspaceId],
					exact: true,
				});
			}
		}

		return () => {
			if (latestConnectionVersionRef.current === subscribedConnectionVersion) {
				chatSubscribeRef.current?.unsubscribe();

				queryClient.removeQueries({
					queryKey: ['chatMessage', selectedChat, userStatus?.profile.lastSeenTeamspaceId],
					exact: true,
				});
			}

			chatSubscribeRef.current = null;
		};
	}, [selectedChat, stompClient, stompConnectionVersion]);
};

export default useChatSubscription;
