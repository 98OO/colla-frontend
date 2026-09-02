import { useCallback, useRef, useState } from 'react';
import { ReactComponent as FileIcon } from '@assets/svg/file.svg';
import { ReactComponent as ImageIcon } from '@assets/svg/image.svg';
import ChatMessageActions from '@components/Chat/ChatMessageActions/ChatMessageActions';
import LatestMessageBox from '@components/Chat/LatestMessageBox/LatestMessageBox';
import MyMessageBox from '@components/Chat/MyMessageBox/MyMessageBox';
import VirtualChatMessageList from '@components/Chat/VirtualChatMessageList/VirtualChatMessageList';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';
import useChatInfiniteScroll from '@hooks/chatting/useChatInfiniteScroll';
import useChatInput from '@hooks/chatting/useChatInput';
import useChatMessages from '@hooks/chatting/useChatMessages';
import useChatScroll from '@hooks/chatting/useChatScroll';
import useChatSubscription from '@hooks/chatting/useChatSubscription';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import * as S from './Chatting.styled';

const Chatting = ({ selectedChat }: { selectedChat: number }) => {
	const { userStatus } = useUserStatusQuery();
	const chatRef = useRef<HTMLDivElement | null>(null);
	const [chatContainer, setChatContainer] = useState<HTMLDivElement | null>(null);
	const [virtualLayoutReadyChatId, setVirtualLayoutReadyChatId] = useState<number | null>(null);

	const {
		chatHistory,
		isFetchingNextPage,
		hasNextPage,
		paginationVersion,
		reconnectedMessageVersion,
		setChatHistory,
		fetchNextPage,
	} = useChatMessages({
		selectedChat,
		userStatus,
	});

	const {
		isInitialScrollComplete,
		isLatestMessageVisible,
		messageEndRef,
		handleLatestMessageClick,
		handleCheckScroll,
	} = useChatScroll({
		userStatus,
		chatHistory,
		setChatHistory,
		chatRef,
		reconnectedMessageVersion,
	});

	const { topSentinelRef } = useChatInfiniteScroll({
		chatContainer,
		hasNextPage,
		isFetchingNextPage,
		isInitialScrollComplete: isInitialScrollComplete && virtualLayoutReadyChatId === selectedChat,
		paginationVersion,
		fetchNextPage,
	});

	const {
		chatMessage,
		queuedMessages,
		failedMessages,
		retryingMessageIds,
		inputImageRef,
		inputFileRef,
		handleMessageChange,
		handleText,
		handleFailedMessageRetry,
		handleFailedMessageDelete,
		handleImageUploadClick,
		handleFileUploadClick,
		handleImageChange,
		handleFileChange,
		handleKeyDown,
	} = useChatInput({ selectedChat, userStatus, messageEndRef });

	useChatSubscription({
		selectedChat,
		teamspaceId: userStatus?.profile.lastSeenTeamspaceId,
		handleCheckScroll,
	});

	const handleChatContainerRef = useCallback((element: HTMLDivElement | null) => {
		chatRef.current = element;

		setChatContainer(element);
	}, []);

	const handleInitialVirtualLayoutSettled = useCallback(() => {
		if (virtualLayoutReadyChatId === selectedChat) return;

		messageEndRef.current?.scrollIntoView();
		setVirtualLayoutReadyChatId(selectedChat);
	}, [messageEndRef, selectedChat, virtualLayoutReadyChatId]);

	return (
		<S.ChattingContainer>
			<S.ChattingListContainer ref={handleChatContainerRef}>
				<S.ChatMessageList>
					{queuedMessages.map((message) => (
						<MyMessageBox
							key={message.id}
							type={message.type}
							content={message.type === 'TEXT' ? message.content : ''}
							date={null}
							file={
								message.type === 'TEXT'
									? []
									: [
											{
												id: -Number(message.id.split('-')[0]),
												filename: message.file.name,
												url: message.localUrl,
												size: message.file.size,
											},
										]
							}
							state
							actions={<ChatMessageActions />}
						/>
					))}
					{failedMessages.map((message) => (
						<MyMessageBox
							key={message.id}
							type={message.type}
							content={message.type === 'TEXT' ? message.content : ''}
							date={null}
							file={
								message.type === 'TEXT'
									? []
									: [
											{
												id: -Number(message.id.split('-')[0]),
												filename: message.file.name,
												url: message.localUrl,
												size: message.file.size,
											},
										]
							}
							state
							actions={
								<ChatMessageActions
									isRetrying={retryingMessageIds.includes(message.id)}
									onRetry={() => handleFailedMessageRetry(message)}
									onDelete={() => handleFailedMessageDelete(message.id)}
								/>
							}
						/>
					))}
					{chatHistory && (
						<VirtualChatMessageList
							messages={chatHistory.chatChannelMessages}
							chatContainer={chatContainer}
							userId={userStatus?.profile.userId}
							isInitialScrollComplete={isInitialScrollComplete}
							isVirtualLayoutReady={virtualLayoutReadyChatId === selectedChat}
							onInitialLayoutSettled={handleInitialVirtualLayoutSettled}
						/>
					)}
					<S.ChatTopSentinel ref={topSentinelRef} />
				</S.ChatMessageList>
				<S.MessageEndWrapper ref={messageEndRef} />
			</S.ChattingListContainer>
			{isLatestMessageVisible && chatHistory && (
				<LatestMessageBox
					latestMessage={chatHistory.chatChannelMessages[0]}
					onClick={handleLatestMessageClick}
				/>
			)}
			<S.ChattingInputContainer>
				<S.ChattingInputWrapper
					value={chatMessage}
					onChange={handleMessageChange}
					onKeyDown={handleKeyDown}
					maxLength={1000}
					placeholder='메세지 입력'
				/>
				<Flex height='38' paddingLeft='4' paddingRight='4' justify='space-between' align='center'>
					<Flex paddingLeft='3' paddingRight='3' gap='4'>
						<IconButton
							icon={ImageIcon}
							ariaLabel='image'
							color='secondary'
							size='md'
							onClick={handleImageUploadClick}
						/>
						<S.ImgUploadWrapper
							type='file'
							accept='image/*'
							onChange={handleImageChange}
							ref={inputImageRef}
						/>
						<IconButton
							icon={FileIcon}
							ariaLabel='file'
							color='secondary'
							size='md'
							onClick={handleFileUploadClick}
						/>
						<S.ImgUploadWrapper type='file' onChange={handleFileChange} ref={inputFileRef} />
					</Flex>
					<Flex paddingLeft='4' paddingRight='4' gap='10' align='center'>
						<Text size='sm' weight='semiBold' color='tertiary'>
							{`${chatMessage.length}/1000`}
						</Text>
						<Flex width='48'>
							<Button
								label='전송'
								variant='primary'
								size='sm'
								isFull
								disabled={chatMessage.trimStart().length === 0}
								onClick={handleText}
							/>
						</Flex>
					</Flex>
				</Flex>
			</S.ChattingInputContainer>
		</S.ChattingContainer>
	);
};

export default Chatting;
