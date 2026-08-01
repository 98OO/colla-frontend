import { useEffect, useRef } from 'react';
import { queryClient } from '@hooks/queries/common/queryClient';
import { StompSubscription } from '@stomp/stompjs';
import useSocketStore from '@stores/socketStore';
import { END_POINTS } from '@constants/api';
import type { Message } from '@type/chat';

export interface useChatSubscriptionProps {
	selectedChat: number;
	teamspaceId: number | undefined;
	handleCheckScroll: (parsedMessage: Message) => void;
}

interface ChatSubscriptionInfo {
	chatChannelId: number;
	teamspaceId: number;
	connectionVersion: number;
}

const useChatSubscription = (props: useChatSubscriptionProps) => {
	const { selectedChat, teamspaceId, handleCheckScroll } = props;
	const chatSubscribeRef = useRef<StompSubscription | null>(null);
	const previousSubscriptionRef = useRef<ChatSubscriptionInfo | null>(null);
	const handleCheckScrollRef = useRef(handleCheckScroll);
	const { stompClient, stompConnectionVersion } = useSocketStore();
	const latestConnectionVersionRef = useRef(stompConnectionVersion);
	latestConnectionVersionRef.current = stompConnectionVersion;
	handleCheckScrollRef.current = handleCheckScroll;

	useEffect(() => {
		const subscribedConnectionVersion = stompConnectionVersion;

		if (selectedChat && teamspaceId) {
			const previousSubscription = previousSubscriptionRef.current;
			const shouldSyncAfterReconnect =
				previousSubscription?.chatChannelId === selectedChat &&
				previousSubscription.teamspaceId === teamspaceId &&
				stompConnectionVersion > 1 &&
				stompConnectionVersion > previousSubscription.connectionVersion;

			const newChatSubscribe = stompClient?.subscribe(
				END_POINTS.SUBSCRIBE(teamspaceId, selectedChat),
				(message) => {
					const parsedMessage = JSON.parse(message.body);
					const { stompClient: currentStompClient, connectionStatus } = useSocketStore.getState();

					if (connectionStatus === 'connected' && currentStompClient?.connected) {
						currentStompClient.publish({
							destination: END_POINTS.READ_MESSAGE(teamspaceId, selectedChat, parsedMessage.id),
						});
					}

					handleCheckScrollRef.current(parsedMessage);
				}
			);

			if (newChatSubscribe) chatSubscribeRef.current = newChatSubscribe;

			if (shouldSyncAfterReconnect) {
				queryClient.resetQueries({
					queryKey: ['chatMessage', selectedChat, teamspaceId],
					exact: true,
				});
			}

			previousSubscriptionRef.current = {
				chatChannelId: selectedChat,
				teamspaceId,
				connectionVersion: stompConnectionVersion,
			};
		}

		return () => {
			if (latestConnectionVersionRef.current === subscribedConnectionVersion) {
				chatSubscribeRef.current?.unsubscribe();

				queryClient.removeQueries({
					queryKey: ['chatMessage', selectedChat, teamspaceId],
					exact: true,
				});
			}

			chatSubscribeRef.current = null;
		};
	}, [selectedChat, stompClient, stompConnectionVersion, teamspaceId]);
};

export default useChatSubscription;
