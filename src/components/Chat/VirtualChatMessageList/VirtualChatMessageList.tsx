import { useLayoutEffect, useMemo, useRef } from 'react';
import * as S from '@components/Chat/Chatting/Chatting.styled';
import MyMessageBox from '@components/Chat/MyMessageBox/MyMessageBox';
import OtherMessageBox from '@components/Chat/OtherMessageBox/OtherMessageBox';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import VirtualList from '@components/common/VirtualList/VirtualList';
import * as VirtualListStyle from '@components/common/VirtualList/VirtualList.styled';
import useVirtualList from '@hooks/common/useVirtualList';
import { getFormattedDate } from '@utils/getFormattedDate';
import type { Message } from '@type/chat';

const CHAT_MESSAGE_ESTIMATED_HEIGHT = 72;

interface VirtualChatMessageListProps {
	messages: Message[];
	chatContainer: HTMLDivElement | null;
	userId: number | undefined;
	isInitialScrollComplete: boolean;
	isVirtualLayoutReady: boolean;
	onInitialLayoutSettled: () => void;
}

const VirtualChatMessageList = ({
	messages,
	chatContainer,
	userId,
	isInitialScrollComplete,
	isVirtualLayoutReady,
	onInitialLayoutSettled,
}: VirtualChatMessageListProps) => {
	const hasNotifiedInitialLayoutRef = useRef(false);
	const chronologicalMessages = useMemo(() => [...messages].reverse(), [messages]);
	const virtualizer = useVirtualList({
		items: chronologicalMessages,
		scrollElement: chatContainer,
		getItemKey: (message) => message.id,
		estimateSize: () => CHAT_MESSAGE_ESTIMATED_HEIGHT,
		initialOffset: chronologicalMessages.length * CHAT_MESSAGE_ESTIMATED_HEIGHT,
		enabled: isInitialScrollComplete,
		useFlushSync: isVirtualLayoutReady,
		overscan: 5,
	});
	const virtualItems = virtualizer.getVirtualItems();
	const hasMeasuredVirtualItems =
		virtualItems.length > 0 &&
		virtualItems.every((virtualItem) => virtualizer.itemSizeCache.has(virtualItem.key));

	useLayoutEffect(() => {
		if (!hasMeasuredVirtualItems || hasNotifiedInitialLayoutRef.current) return;

		hasNotifiedInitialLayoutRef.current = true;
		onInitialLayoutSettled();
	}, [hasMeasuredVirtualItems, onInitialLayoutSettled]);

	if (!isInitialScrollComplete) {
		return (
			<VirtualListStyle.VirtualListContainer
				style={{ height: chronologicalMessages.length * CHAT_MESSAGE_ESTIMATED_HEIGHT }}
			/>
		);
	}

	return (
		<VirtualList
			items={chronologicalMessages}
			virtualizer={virtualizer}
			renderItem={(message, index) => {
				const previousMessage = index > 0 ? chronologicalMessages[index - 1] : null;
				const nextMessage =
					index < chronologicalMessages.length - 1 ? chronologicalMessages[index + 1] : null;
				const isFirstMessageInGroup =
					previousMessage?.author.id !== message.author.id ||
					previousMessage?.createdAt !== message.createdAt;
				const isLastMessageInGroup =
					nextMessage?.author.id !== message.author.id ||
					nextMessage?.createdAt !== message.createdAt;
				const shouldShowDate =
					!previousMessage ||
					getFormattedDate(message.createdAt, 'chatDate') !==
						getFormattedDate(previousMessage.createdAt, 'chatDate');
				const attachments = message.attachments.map((attachment) => ({
					filename: attachment.filename,
					url: attachment.url,
					id: attachment.id,
					size: attachment.size,
				}));

				return (
					<Flex direction='column'>
						{shouldShowDate && (
							<Flex justify='center' height='28' margin='20px 0 10px 0'>
								<S.ChattingDateWrapper>
									<Text size='sm' weight='medium' color='tertiary'>
										{getFormattedDate(message.createdAt, 'chatDate')}
									</Text>
								</S.ChattingDateWrapper>
							</Flex>
						)}
						{message.author.id === userId ? (
							<MyMessageBox
								type={message.type}
								content={message.content}
								date={isLastMessageInGroup ? getFormattedDate(message.createdAt, 'chatTime') : null}
								file={attachments}
								state={isFirstMessageInGroup}
							/>
						) : (
							<OtherMessageBox
								name={message.author.username}
								profile={message.author.profileImageUrl}
								type={message.type}
								content={message.content}
								date={isLastMessageInGroup ? getFormattedDate(message.createdAt, 'chatTime') : null}
								file={attachments}
								state={isFirstMessageInGroup}
							/>
						)}
					</Flex>
				);
			}}
		/>
	);
};

export default VirtualChatMessageList;
