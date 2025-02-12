import { useEffect, useRef, useState } from 'react';
import useChatMessageQuery from '@hooks/queries/chat/useChatMesaageQuery';
import useSocketStore from '@stores/socketStore';
import { END_POINTS } from '@constants/api';
import type { ChatData } from '@type/chat';
import type { UserInformation } from '@type/user';

interface useChatMessagesProps {
	selectedChat: number;
	userStatus: UserInformation | undefined;
	setPrevHeight: React.Dispatch<React.SetStateAction<number>>;
}

const useChatMessages = (props: useChatMessagesProps) => {
	const { selectedChat, userStatus, setPrevHeight } = props;
	const [chatHistory, setChatHistory] = useState<ChatData | null>(null);
	const chatRef = useRef<HTMLDivElement>(null);
	const { stompClient } = useSocketStore();
	const { messages, fetchNextPage, hasNextPage, isFetching } =
		useChatMessageQuery(selectedChat, userStatus?.profile.lastSeenTeamspaceId);

	useEffect(() => {
		if (
			messages &&
			messages.pages[0].chatChannelMessages.length > 0 &&
			userStatus
		) {
			stompClient?.send(
				END_POINTS.READ_MESSAGE(
					userStatus.profile.lastSeenTeamspaceId,
					selectedChat,
					messages.pages[0].chatChannelMessages[0].id
				)
			);
		}

		if (chatRef.current) setPrevHeight(chatRef.current.scrollHeight);

		setChatHistory((prevChatHistory) => {
			const lastPageMessages =
				messages?.pages[messages.pages.length - 1]?.chatChannelMessages ?? [];

			return {
				chatChannelMessages: [
					...(prevChatHistory?.chatChannelMessages ?? []),
					...lastPageMessages,
				],
			};
		});
	}, [messages?.pages]);

	return {
		chatHistory,
		chatRef,
		isFetching,
		hasNextPage,
		setChatHistory,
		fetchNextPage,
	};
};

export default useChatMessages;
