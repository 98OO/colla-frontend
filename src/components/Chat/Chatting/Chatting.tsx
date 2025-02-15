import { useState } from 'react';
import LatestMessageBox from '@components/Chat/LatestMessageBox/LatestMessageBox';
import MyMessageBox from '@components/Chat/MyMessageBox/MyMessageBox';
import OtherMessageBox from '@components/Chat/OtherMessageBox/OtherMessageBox';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';
import useChatInput from '@hooks/chatting/useChatInput';
import useChatMessages from '@hooks/chatting/useChatMessages';
import useChatScroll from '@hooks/chatting/useChatScroll';
import useChatSubscription from '@hooks/chatting/useChatSubscription';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { getFormattedDate } from '@utils/getFormattedDate';
import * as S from './Chatting.styled';

const Chatting = ({ selectedChat }: { selectedChat: number }) => {
	const { userStatus } = useUserStatusQuery();
	const [prevHeight, setPrevHeight] = useState(0);

	const {
		chatHistory,
		chatRef,
		isFetching,
		hasNextPage,
		setChatHistory,
		fetchNextPage,
	} = useChatMessages({
		selectedChat,
		userStatus,
		setPrevHeight,
	});

	const {
		isLatestMessageVisible,
		messageEndRef,
		handleLatestMessageClick,
		handleCheckScroll,
	} = useChatScroll({
		userStatus,
		chatHistory,
		setChatHistory,
		chatRef,
		prevHeight,
	});

	const {
		chatMessage,
		inputImageRef,
		inputFileRef,
		handleMessageChange,
		handleText,
		handleImageUploadClick,
		handleFileUploadClick,
		handleImageChange,
		handleFileChange,
		handleKeyDown,
	} = useChatInput({ selectedChat, userStatus, messageEndRef });

	useChatSubscription({ selectedChat, userStatus, handleCheckScroll });

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
										<Flex justify='center' height='28' margin='20px 0 10px 0'>
											<S.ChattingDateWrapper>
												<Text size='sm' weight='medium' color='tertiary'>
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
					placeholder='메세지 입력'
				/>
				<Flex
					height='38'
					paddingLeft='4'
					paddingRight='4'
					justify='space-between'
					align='center'>
					<Flex paddingLeft='3' paddingRight='3' gap='4'>
						<IconButton
							icon='Image'
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
							icon='File'
							ariaLabel='file'
							color='secondary'
							size='md'
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
