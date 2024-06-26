import { ChangeEvent, useRef, useState, useEffect, KeyboardEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import MyMessageBox from '@components/Chat/MyMessageBox/MyMessageBox';
import OtherMessageBox from '@components/Chat/OtherMessageBox/OtherMessageBox';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';
import useFileUpload from '@hooks/common/useFileUpload';
import useChatMessageQuery from '@hooks/queries/chat/useChatMesaageQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { StompSubscription } from '@stomp/stompjs';
import useSocketStore from '@stores/socketStore';
import useToastStore from '@stores/toastStore';
import type { ChatData } from '@type/chat';
import * as S from './Chatting.styled';

export interface ChattingProps {
	selectedChat: number;
}

const Chatting = (props: ChattingProps) => {
	const { userStatus } = useUserStatusQuery();
	const teamspaceId = userStatus?.profile.lastSeenTeamspaceId;
	const { selectedChat } = props;
	const { stompClient } = useSocketStore();
	const { messages, fetchNextPage, hasNextPage, isFetching } =
		useChatMessageQuery(selectedChat, teamspaceId);

	const [chatHistory, setChatHistory] = useState<ChatData | null>(null);

	const { makeToast } = useToastStore();
	const [chatMessage, setChatMessage] = useState('');
	const chatContainerRef = useRef<HTMLDivElement>(null);

	const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		if (value.length <= 1000) setChatMessage(value);
	};

	const [chatSubscribe, setChatSubscribe] = useState<StompSubscription | null>(
		null
	);

	useEffect(() => {
		if (selectedChat) {
			if (chatSubscribe) {
				console.log('전에 구독', chatSubscribe);
				chatSubscribe?.unsubscribe();
			}
			// 새로운 구독 설정
			const newChatSubscribe = stompClient?.subscribe(
				`/topic/teamspaces/${userStatus?.profile.lastSeenTeamspaceId}/chat-channels/${selectedChat}/messages`,
				(message) => {
					const parsedMessage = JSON.parse(message.body);
					stompClient?.send(
						`/app/teamspaces/${userStatus?.profile.lastSeenTeamspaceId}/chat-channels/${selectedChat}/messages/${parsedMessage.id}/read`
					);
					setChatHistory((prevChatHistory) => ({
						chatChannelMessages: [
							parsedMessage,
							...(prevChatHistory?.chatChannelMessages ?? []),
						],
					}));
				}
			);

			if (newChatSubscribe) {
				setChatSubscribe(newChatSubscribe);
			}
			setChatHistory(null);
		}
	}, [selectedChat, stompClient]);

	useEffect(() => {
		if (messages && messages.pages[0].chatChannelMessages.length > 0) {
			stompClient?.send(
				`/app/teamspaces/${userStatus?.profile.lastSeenTeamspaceId}/chat-channels/${selectedChat}/messages/${messages.pages[0].chatChannelMessages[0].id}/read`
			);
		}
		const allChatChannelMessages =
			messages?.pages.map((page) => page.chatChannelMessages) ?? [];

		const mergedChatChannelMessages = allChatChannelMessages.flat();

		const chatData = { chatChannelMessages: mergedChatChannelMessages };
		setChatHistory(chatData);
	}, [messages?.pages]);

	const handleText = () => {
		stompClient?.send(
			`/app/teamspaces/${userStatus?.profile.lastSeenTeamspaceId}/chat-channels/${selectedChat}/messages`,
			{},
			JSON.stringify({
				chatType: 'TEXT',
				content: chatMessage,
				images: [],
				attachments: [],
			})
		);
		setChatMessage('');

		setTimeout(() => {
			if (chatContainerRef.current) {
				chatContainerRef.current.scrollTop =
					chatContainerRef.current.scrollHeight;
			}
		}, 150);
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
	const { isFileSizeExceedLimit, uploadFiles } = useFileUpload();

	const handleImageChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files && event.target.files[0]) {
			if (isFileSizeExceedLimit(event.target.files[0])) {
				makeToast('이미지 크기는 최대 100MB입니다.', 'Warning');
				return;
			}
			if (inputImageRef.current?.files) {
				const imageUrl = await uploadFiles(
					inputImageRef.current?.files,
					'TEAMSPACE',
					userStatus?.profile.lastSeenTeamspaceId
				);
				if (imageUrl) {
					stompClient?.send(
						`/app/teamspaces/${userStatus?.profile.lastSeenTeamspaceId}/chat-channels/${selectedChat}/messages`,
						{},
						JSON.stringify({
							chatType: 'IMAGE',
							content: null,
							images: [
								{
									name: inputImageRef.current?.files[0].name,
									fileUrl: imageUrl[0],
									size: inputImageRef.current?.files[0].size,
								},
							],
							attachments: [],
						})
					);
				}
			}
		}
	};

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			if (isFileSizeExceedLimit(event.target.files[0])) {
				makeToast('파일 크기는 최대 100MB입니다.', 'Warning');
				return;
			}
			if (inputFileRef.current?.files) {
				const fileUrl = await uploadFiles(
					inputFileRef.current?.files,
					'TEAMSPACE',
					userStatus?.profile.lastSeenTeamspaceId
				);
				if (fileUrl) {
					stompClient?.send(
						`/app/teamspaces/${userStatus?.profile.lastSeenTeamspaceId}/chat-channels/${selectedChat}/messages`,
						{},
						JSON.stringify({
							chatType: 'FILE',
							content: null,
							images: [],
							attachments: [
								{
									name: inputFileRef.current?.files[0].name,
									fileUrl: fileUrl[0],
									size: inputFileRef.current?.files[0].size,
								},
							],
						})
					);
				}
			}
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter') {
			if (!event.shiftKey) {
				event.preventDefault();
				if (chatMessage.length !== 0) {
					handleText();
				}
			}
		}
	};

	return (
		<S.ChattingContainer>
			<S.ChattingListContainer ref={chatContainerRef}>
				<InfiniteScroll
					loadMore={() => {
						if (!isFetching) fetchNextPage();
					}}
					isReverse
					hasMore={hasNextPage}
					useWindow={false}>
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
																id: attachment.id,
																size: attachment.size,
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
																id: attachment.id,
																size: attachment.size,
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
				</InfiniteScroll>
			</S.ChattingListContainer>

			<S.ChattingInputContainer>
				<S.ChattingInputWrapper
					value={chatMessage}
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
							{`${chatMessage.length}/1000`}
						</Text>
						<Flex width='48'>
							<Button
								label='전송'
								variant='primary'
								size='sm'
								isFull
								disabled={chatMessage.length === 0}
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
