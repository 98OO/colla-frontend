import { useEffect, useRef, useState } from 'react';
import useChatMessageQuery from '@hooks/queries/chat/useChatMessageQuery';
import useSocketStore from '@stores/socketStore';
import { END_POINTS } from '@constants/api';
import type { ChatData } from '@type/chat';
import type { UserInformation } from '@type/user';

interface useChatMessagesProps {
	selectedChat: number;
	userStatus: UserInformation | undefined;
}

const useChatMessages = (props: useChatMessagesProps) => {
	const { selectedChat, userStatus } = props;
	const [chatHistory, setChatHistory] = useState<ChatData | null>(null);
	const [paginationVersion, setPaginationVersion] = useState(0);
	const lastReadMessageIdRef = useRef<number | null>(null);
	const { stompClient } = useSocketStore();
	const { messages, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatMessageQuery(
		selectedChat,
		userStatus?.profile.lastSeenTeamspaceId
	);
	const messagePages = messages?.pages;

	useEffect(() => {
		setChatHistory(null);
		setPaginationVersion(0);
		lastReadMessageIdRef.current = null;
	}, [selectedChat]);

	useEffect(() => {
		if (!messagePages) return;

		const latestMessageId = messagePages[0].chatChannelMessages[0]?.id;

		if (!latestMessageId || !userStatus) return;
		if (lastReadMessageIdRef.current === latestMessageId) return;

		if (messagePages[0].chatChannelMessages.length > 0) {
			stompClient?.send(
				END_POINTS.READ_MESSAGE(
					userStatus.profile.lastSeenTeamspaceId,
					selectedChat,
					latestMessageId
				)
			);
			lastReadMessageIdRef.current = latestMessageId;
		}
	}, [messagePages, selectedChat, stompClient, userStatus]);

	useEffect(() => {
		if (!messagePages) return;

		setChatHistory((prevChatHistory) => {
			const lastPageMessages = messagePages[messagePages.length - 1]?.chatChannelMessages ?? [];

			return {
				chatChannelMessages: [...(prevChatHistory?.chatChannelMessages ?? []), ...lastPageMessages],
			};
		});
		setPaginationVersion((version) => version + 1);
	}, [messagePages]);

	return {
		chatHistory,
		isFetchingNextPage,
		hasNextPage,
		paginationVersion,
		setChatHistory,
		fetchNextPage,
	};
};

export default useChatMessages;
