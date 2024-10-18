import { ChangeEvent, useRef, useState, useEffect, KeyboardEvent } from 'react';
import LatestMessageBox from '@components/Chat/LatestMessageBox/LatestMessageBox';
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
import { END_POINTS } from '@constants/api';
import { CHAT_AUTO_SCROLL_LIMIT } from '@constants/size';
import type { ChatData } from '@type/chat';
import * as S from './Chatting.styled';

interface ChattingProps {
	selectedChat: number;
}

const Chatting = (props: ChattingProps) => {
	const { userStatus } = useUserStatusQuery();
	const { selectedChat } = props;
	const { stompClient } = useSocketStore();
	const { makeToast } = useToastStore();

	const { messages, fetchNextPage, hasNextPage, isFetching } =
		useChatMessageQuery(selectedChat, userStatus?.profile.lastSeenTeamspaceId);

	const [chatHistory, setChatHistory] = useState<ChatData | null>(null);
	const [chatMessage, setChatMessage] = useState('');
	const [prevHeight, setPrevHeight] = useState(0);
	const [isScrollAtBottom, setIsScrollAtBottom] = useState(false);
	const [isLatestMessageVisible, setIsLatestMessageVisible] = useState(false);
	const [initialLoad, setInitialLoad] = useState(true);

	const chatRef = useRef<HTMLDivElement>(null);
	const messageEndRef = useRef<HTMLInputElement | null>(null);
	const chatSubscribeRef = useRef<StompSubscription | null>(null);
	const inputImageRef = useRef<HTMLInputElement | null>(null);
	const inputFileRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (selectedChat && userStatus) {
			const newChatSubscribe = stompClient?.subscribe(
				END_POINTS.SUBSCRIBE(
					userStatus.profile.lastSeenTeamspaceId,
					selectedChat
				),
				(message) => {
					const parsedMessage = JSON.parse(message.body);
					stompClient?.send(
						END_POINTS.READ_MESSAGE(
							userStatus.profile.lastSeenTeamspaceId,
							selectedChat,
							parsedMessage.id
						)
					);

					const isAutoScroll =
						chatRef.current &&
						chatRef.current.scrollHeight -
							chatRef.current.clientHeight -
							chatRef.current.scrollTop <=
							CHAT_AUTO_SCROLL_LIMIT;

					if (parsedMessage.author.id !== userStatus.profile.userId) {
						if (isAutoScroll) {
							if (parsedMessage.type === 'TEXT') setIsScrollAtBottom(true);
							else {
								setTimeout(() => {
									messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
								}, 500);
							}
						} else setIsLatestMessageVisible(true);
					} else {
						setIsLatestMessageVisible(false);
						if (parsedMessage.type === 'TEXT') setIsScrollAtBottom(true);
					}

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

	useEffect(() => {
		if (!chatHistory || chatHistory.chatChannelMessages.length === 0) return;

		if (isScrollAtBottom) {
			messageEndRef.current?.scrollIntoView();
			setIsScrollAtBottom(false);
		} else if (chatRef.current)
			window.scrollTo({ top: chatRef.current.scrollHeight - prevHeight });
	}, [chatHistory]);

	useEffect(() => {
		const observedElement = chatRef.current;
		const resizeObserver = new ResizeObserver(() => {
			if (initialLoad) {
				messageEndRef.current?.scrollIntoView();
				setInitialLoad(false);
			}
		});

		if (observedElement) resizeObserver.observe(observedElement);

		return () => {
			if (observedElement) resizeObserver.unobserve(observedElement);
		};
	}, []);

	useEffect(() => {
		const scrollElement = chatRef.current;
		let ticking = false;

		const handleScroll = () => {
			if (!ticking && scrollElement) {
				requestAnimationFrame(() => {
					const isBottom =
						scrollElement.scrollHeight -
							scrollElement.scrollTop -
							scrollElement.clientHeight <=
						CHAT_AUTO_SCROLL_LIMIT;

					if (isBottom) setIsLatestMessageVisible(false);
					ticking = false;
				});

				ticking = true;
			}
		};

		scrollElement?.addEventListener('scroll', handleScroll);

		return () => {
			scrollElement?.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		if (value.length <= 1000) setChatMessage(value);
	};

	const handleText = () => {
		if (userStatus) {
			stompClient?.send(
				END_POINTS.SEND_MESSAGE(
					userStatus.profile.lastSeenTeamspaceId,
					selectedChat
				),
				{},
				JSON.stringify({
					chatType: 'TEXT',
					content: chatMessage,
					images: [],
					attachments: [],
				})
			);
		}

		setChatMessage('');
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
				if (imageUrl && userStatus) {
					stompClient?.send(
						END_POINTS.SEND_MESSAGE(
							userStatus.profile.lastSeenTeamspaceId,
							selectedChat
						),
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
					messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
				}, 500);
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
				if (fileUrl && userStatus) {
					stompClient?.send(
						END_POINTS.SEND_MESSAGE(
							userStatus.profile.lastSeenTeamspaceId,
							selectedChat
						),
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
					messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
				}, 500);
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

	const handleLatestMessageClick = () => {
		setIsLatestMessageVisible(false);
		messageEndRef.current?.scrollIntoView();
	};

	return (
		<S.ChattingContainer>
			<S.ChattingListContainer ref={chatRef}>
				<S.InfiniteScrollContainer
					loadMore={() => {
						if (!isFetching) fetchNextPage();
					}}
					isReverse
					hasMore={hasNextPage}
					useWindow={false}
					initialLoad={false}>
					{chatHistory &&
						chatHistory.chatChannelMessages.map((msg, index, array) => {
							const previousMsg =
								index < array.length - 1 ? array[index + 1] : null;
							const nextMsg = index > 0 ? array[index - 1] : null;

							return (
								<Flex direction='column' key={msg.id}>
									{((previousMsg &&
										getFormattedDate(msg.createdAt, 'chatDate') !==
											getFormattedDate(previousMsg.createdAt, 'chatDate')) ||
										index === array.length - 1) && (
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
												nextMsg?.author.id !== msg.author.id ||
												(nextMsg?.author.id === msg.author.id &&
													nextMsg?.createdAt !== msg.createdAt)
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
												previousMsg?.createdAt !== msg.createdAt
											}
										/>
									) : (
										<OtherMessageBox
											name={msg.author.username}
											profile={msg.author.profileImageUrl}
											type={msg.type}
											content={msg.content}
											date={
												nextMsg?.author.id !== msg.author.id ||
												(nextMsg?.author.id === msg.author.id &&
													nextMsg?.createdAt !== msg.createdAt)
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
												previousMsg?.createdAt !== msg.createdAt
											}
										/>
									)}
								</Flex>
							);
						})}
				</S.InfiniteScrollContainer>
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
