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
import { queryClient } from '@hooks/queries/common/queryClient';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { StompSubscription } from '@stomp/stompjs';
import useSocketStore from '@stores/socketStore';
import useToastStore from '@stores/toastStore';
import { getFormattedDate } from '@utils/getFormattedDate';
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
	const { makeToast } = useToastStore();

	const { messages, fetchNextPage, hasNextPage, isFetching } =
		useChatMessageQuery(selectedChat, teamspaceId);

	const [chatHistory, setChatHistory] = useState<ChatData | null>(null);
	const [chatMessage, setChatMessage] = useState('');
	const [prevHeight, setPrevHeight] = useState(0);
	const [isInitialLoad, setIsInitialLoad] = useState(true);

	const chatRef = useRef<HTMLDivElement>(null);
	const messageEndRef = useRef<HTMLInputElement | null>(null);
	const chatSubscribeRef = useRef<StompSubscription | null>(null);
	const inputImageRef = useRef<HTMLInputElement | null>(null);
	const inputFileRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (selectedChat) {
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

		if (!isFetching)
			window.scrollTo({ top: document.body.scrollHeight - prevHeight });

		setPrevHeight(chatRef.current?.scrollHeight ?? 0);
	}, [messages?.pages]);

	useEffect(() => {
		if (chatHistory && isInitialLoad) {
			messageEndRef.current?.scrollIntoView();
			setIsInitialLoad(false);
		}
	}, [chatHistory]);

	const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		if (value.length <= 1000) setChatMessage(value);
	};

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
			messageEndRef.current?.scrollIntoView();
		}, 200);
	};

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

				setTimeout(() => {
					messageEndRef.current?.scrollIntoView();
				}, 300);
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

				setTimeout(() => {
					messageEndRef.current?.scrollIntoView();
				}, 300);
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
			<S.ChattingListContainer ref={chatRef}>
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
											getFormattedDate(msg.createdAt, 'chatDate') !==
												getFormattedDate(
													previousMsg?.createdAt,
													'chatDate'
												) && (
												<Flex justify='center' height='28'>
													<S.ChattingDateWrapper>
														<Text size='sm' weight='medium' color='secondary'>
															{getFormattedDate(msg.createdAt, 'chatDate')}
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
														? getFormattedDate(msg.createdAt, 'chatTime')
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
														? getFormattedDate(msg.createdAt, 'chatTime')
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
					<S.messageEndWrapper ref={messageEndRef} />
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
