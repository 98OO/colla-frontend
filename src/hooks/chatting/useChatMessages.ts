import { useEffect, useRef, useState } from 'react';
import useChatMessageQuery from '@hooks/queries/chat/useChatMessageQuery';
import useSocketStore from '@stores/socketStore';
import { END_POINTS } from '@constants/api';
import type { ChatData, Message } from '@type/chat';
import type { UserInformation } from '@type/user';

interface useChatMessagesProps {
	selectedChat: number;
	userStatus: UserInformation | undefined;
}

const useChatMessages = (props: useChatMessagesProps) => {
	const { selectedChat, userStatus } = props;
	const [chatHistory, setChatHistory] = useState<ChatData | null>(null);
	const [paginationVersion, setPaginationVersion] = useState(0);
	const [reconnectedMessageVersion, setReconnectedMessageVersion] = useState(0);
	const lastReadMessageIdRef = useRef<number | null>(null);
	const latestPageMessageIdRef = useRef<number | null>(null);
	const processedPageCountRef = useRef(0);
	const previousConnectionVersionRef = useRef(0);
	const shouldHandleReconnectedMessagesRef = useRef(false);
	const { stompClient, stompConnectionVersion, connectionStatus } = useSocketStore();
	const { messages, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatMessageQuery(
		selectedChat,
		userStatus?.profile.lastSeenTeamspaceId
	);
	const messagePages = messages?.pages;

	useEffect(() => {
		if (stompConnectionVersion > previousConnectionVersionRef.current) {
			shouldHandleReconnectedMessagesRef.current = previousConnectionVersionRef.current > 0;
		}

		previousConnectionVersionRef.current = stompConnectionVersion;
	}, [stompConnectionVersion]);

	useEffect(() => {
		if (!messagePages) return;

		const latestMessages = messagePages[0]?.chatChannelMessages ?? [];
		const latestMessageId = latestMessages[0]?.id;

		if (
			!latestMessageId ||
			!userStatus ||
			connectionStatus !== 'connected' ||
			!stompClient?.connected
		)
			return;
		if (lastReadMessageIdRef.current === latestMessageId) return;

		stompClient.publish({
			destination: END_POINTS.READ_MESSAGE(
				userStatus.profile.lastSeenTeamspaceId,
				selectedChat,
				latestMessageId
			),
		});
		lastReadMessageIdRef.current = latestMessageId;
	}, [messagePages, selectedChat, stompClient, connectionStatus, userStatus]);

	useEffect(() => {
		if (!messagePages) return;

		const latestPageMessages = messagePages[0]?.chatChannelMessages ?? [];
		const latestPageMessageId = latestPageMessages[0]?.id ?? null;
		const previousLatestPageMessageId = latestPageMessageIdRef.current;
		const isLatestPageUpdated = latestPageMessageIdRef.current !== latestPageMessageId;
		const hasNewPage = processedPageCountRef.current < messagePages.length;
		const shouldHandleReconnectedMessages =
			shouldHandleReconnectedMessagesRef.current &&
			previousLatestPageMessageId !== null &&
			isLatestPageUpdated;

		latestPageMessageIdRef.current = latestPageMessageId;
		processedPageCountRef.current = messagePages.length;

		if (!isLatestPageUpdated && !hasNewPage) return;

		setChatHistory((prevChatHistory) => {
			const previousMessages = prevChatHistory?.chatChannelMessages ?? [];
			const messagesToMerge: Message[] = isLatestPageUpdated
				? latestPageMessages
				: messagePages[messagePages.length - 1]?.chatChannelMessages ?? [];
			const previousMessageIds = new Set(previousMessages.map((message) => message.id));
			const incomingMessageIds = new Set(messagesToMerge.map((message) => message.id));

			const mergedMessages = isLatestPageUpdated
				? [
						...messagesToMerge,
						...previousMessages.filter((message) => !incomingMessageIds.has(message.id)),
					]
				: [
						...previousMessages,
						...messagesToMerge.filter((message) => !previousMessageIds.has(message.id)),
					];

			return {
				chatChannelMessages: mergedMessages.sort((firstMessage, secondMessage) => {
					return secondMessage.id - firstMessage.id;
				}),
			};
		});
		setPaginationVersion((version) => version + 1);

		if (shouldHandleReconnectedMessages) {
			shouldHandleReconnectedMessagesRef.current = false;
			setReconnectedMessageVersion((version) => version + 1);
		}
	}, [messagePages]);

	return {
		chatHistory,
		isFetchingNextPage,
		hasNextPage,
		paginationVersion,
		reconnectedMessageVersion,
		setChatHistory,
		fetchNextPage,
	};
};

export default useChatMessages;
