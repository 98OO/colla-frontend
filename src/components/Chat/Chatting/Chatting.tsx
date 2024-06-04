import { ChangeEvent, useRef, useState, useEffect, KeyboardEvent } from 'react';
import MyMessageBox from '@components/Chat/MyMessageBox/MyMessageBox';
import OtherMessageBox from '@components/Chat/OtherMessageBox/OtherMessageBox';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';
import useFileUpload from '@hooks/common/useFileUpload';
import useChatMessageQuery from '@hooks/queries/chat/useChatMesaageQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { CompatClient } from '@stomp/stompjs';
import useToastStore from '@stores/toastStore';
import type { ChatData } from '@type/chat';
import * as S from './Chatting.styled';

export interface ChattingProps {
	selectedChat: number;
	stompClient: CompatClient;
}

const Chatting = (props: ChattingProps) => {
	const { userStatus } = useUserStatusQuery();
	const { selectedChat, stompClient } = props;

	const [before, setBefore] = useState(0);
	const { chatMessage, refetch } = useChatMessageQuery(
		selectedChat,
		userStatus?.profile.lastSeenTeamspaceId,
		before
	);
	const { makeToast } = useToastStore();
	const [message, setMessage] = useState('');
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const [chatHistory, setChatHistory] = useState<ChatData | null>(null);

	const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		if (value.length <= 1000) setMessage(value);
	};

	const scrollToBottom = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		if (selectedChat) {
			setBefore(0);
			stompClient.subscribe(
				`/topic/teamspaces/${userStatus?.profile.lastSeenTeamspaceId}/chat-channels/${selectedChat}/messages`,
				(messages) => {
					setChatHistory((prevChatHistory) => ({
						chatChannelMessages: [
							JSON.parse(messages.body),
							...(prevChatHistory?.chatChannelMessages ?? []),
						],
					}));
				}
			);
		}
	}, [selectedChat]);

	const handleText = () => {
		stompClient.send(
			`/app/teamspaces/${userStatus?.profile.lastSeenTeamspaceId}/chat-channels/${selectedChat}/messages`,
			{},
			JSON.stringify({
				chatType: 'TEXT',
				content: message,
				images: [],
				attachments: [],
			})
		);
		setMessage('');
	};

	useEffect(() => {
		refetch();
	}, [before]);

	useEffect(() => {
		if (chatMessage && before < 50) {
			setChatHistory(chatMessage);
		} else if (chatMessage && before >= 50) {
			setChatHistory((prevChatHistory) => ({
				chatChannelMessages: [
					...(prevChatHistory?.chatChannelMessages ?? []),
					...chatMessage.chatChannelMessages,
				],
			}));
		}
	}, [chatMessage]);

	useEffect(() => {
		if (chatHistory && before === 0) {
			scrollToBottom();
		} else if (chatHistory && before > 0) {
			if (chatContainerRef.current) {
				chatContainerRef.current.scrollTop =
					chatContainerRef.current.scrollHeight / (before / 50 + 1);
			}
		}
	}, [chatHistory]);

	const handleScroll = () => {
		if (
			chatContainerRef.current &&
			chatContainerRef.current.scrollTop === 0 &&
			chatContainerRef.current.scrollHeight !== 0 &&
			chatMessage &&
			chatMessage.chatChannelMessages.length > 0
		) {
			setBefore(before + 50);
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		return `${year}년 ${month}월 ${day}일`;
	};

	const formatTime = (dateString: string) => {
		const date = new Date(dateString);
		let hours = date.getHours();
		const minutes = date.getMinutes();
		const period = hours >= 12 ? '오후' : '오전';
		hours = hours % 12 || 12;

		const formattedMinutes = minutes !== 0 ? ` ${minutes}분` : '';

		return `${period} ${hours}시${formattedMinutes}`;
	};

	const inputImageRef = useRef<HTMLInputElement | null>(null);
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const handleImageUploadClick = () => {
		inputImageRef.current?.click();
	};
	const handleFileUploadClick = () => {
		inputFileRef.current?.click();
	};
	const [file, setFile] = useState('');
	const { isFileSizeExceedLimit } = useFileUpload();
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			if (isFileSizeExceedLimit(event.target.files[0])) {
				makeToast('이미지 크기는 최대 100MB입니다.', 'Warning');
			}
			setFile(URL.createObjectURL(event.target.files[0]));
		}
	};
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			if (isFileSizeExceedLimit(event.target.files[0])) {
				makeToast('이미지 크기는 최대 100MB입니다.', 'Warning');
			}
		}
	};

	useEffect(() => {}, [file]);

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter') {
			if (!event.shiftKey) {
				event.preventDefault();
				if (message.length !== 0) {
					handleText();
				}
			}
		}
	};

	return (
		<S.ChattingContainer>
			<S.ChattingListContainer ref={chatContainerRef} onScroll={handleScroll}>
				{chatHistory &&
					chatHistory.chatChannelMessages
						.slice()
						.reverse()
						.map((msg, index, array) => {
							const previousMsg = index > 0 ? array[index - 1] : null;
							const nextMsg =
								index < array.length - 1 ? array[index + 1] : null;

							return (
								<Flex direction='column' key={msg.id}>
									{previousMsg &&
										formatDate(msg.createdAt) !==
											formatDate(previousMsg?.createdAt) && (
											<Flex justify='center' height='28'>
												<S.ChattingDateWrapper>
													<Text size='sm' weight='medium' color='secondary'>
														{formatDate(msg.createdAt)}
													</Text>
												</S.ChattingDateWrapper>
											</Flex>
										)}
									{msg.author.id === userStatus?.profile.userId ? (
										<MyMessageBox
											key={msg.id}
											type={msg.type}
											content={msg.content}
											date={
												(index < array.length - 1 &&
													(nextMsg?.author.id !== msg.author.id ||
														(nextMsg?.author.id === msg.author.id &&
															nextMsg?.createdAt !== msg.createdAt))) ||
												index === array.length - 1
													? formatTime(msg.createdAt)
													: null
											}
											file={
												msg.attachments.length > 0
													? msg.attachments.map((attachment) => ({
															filename: attachment.filename,
															url: attachment.url,
														}))
													: []
											}
											state={
												previousMsg?.author.id !== msg.author.id ||
												(previousMsg?.author.id === msg.author.id &&
													previousMsg.createdAt !== msg.createdAt)
											}
										/>
									) : (
										<OtherMessageBox
											name={msg.author.username}
											profile={msg.author.profileImageUrl}
											type={msg.type}
											content={msg.content}
											date={
												(index < array.length - 1 &&
													(nextMsg?.author.id !== msg.author.id ||
														(nextMsg?.author.id === msg.author.id &&
															nextMsg?.createdAt !== msg.createdAt))) ||
												index === array.length - 1
													? formatTime(msg.createdAt)
													: null
											}
											file={
												msg.attachments.length > 0
													? msg.attachments.map((attachment) => ({
															filename: attachment.filename,
															url: attachment.url,
														}))
													: []
											}
											state={
												previousMsg?.author.id !== msg.author.id ||
												(previousMsg?.author.id === msg.author.id &&
													previousMsg.createdAt !== msg.createdAt)
											}
										/>
									)}
								</Flex>
							);
						})}
			</S.ChattingListContainer>
			<S.ChattingInputContainer>
				<S.ChattingInputWrapper
					value={message}
					onChange={handleMessageChange}
					onKeyDown={handleKeyDown}
					maxLength={1000}
					placeholder='Shift + Enter로 줄바꿈합니다.'
				/>
				<Flex
					height='44'
					paddingLeft='4'
					paddingRight='4'
					justify='space-between'
					align='center'>
					<Flex paddingLeft='3' paddingRight='3' gap='4'>
						<IconButton
							icon='Image'
							ariaLabel='image'
							color='secondary'
							size='sm'
							onClick={handleImageUploadClick}
						/>
						<S.ImgUploadWrapper
							type='file'
							accept='image/*'
							onChange={handleImageChange}
							ref={inputImageRef}
						/>
						<IconButton
							icon='File'
							ariaLabel='file'
							color='secondary'
							size='sm'
							onClick={handleFileUploadClick}
						/>
						<S.ImgUploadWrapper
							type='file'
							onChange={handleFileChange}
							ref={inputFileRef}
						/>
					</Flex>
					<Flex paddingLeft='4' paddingRight='4' gap='10' align='center'>
						<Text size='sm' weight='semiBold' color='tertiary'>
							{`${message.length}/1000`}
						</Text>
						<Flex width='48'>
							<Button
								label='전송'
								variant='primary'
								size='sm'
								isFull
								disabled={message.length === 0}
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
