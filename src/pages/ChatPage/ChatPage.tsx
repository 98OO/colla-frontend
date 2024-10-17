import { useState, ChangeEvent } from 'react';
import ChatRoom from '@components/Chat/ChatRoom/ChatRoom';
import Chatting from '@components/Chat/Chatting/Chatting';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Input from '@components/common/Input/Input';
import Text from '@components/common/Text/Text';
import useChatChannelQuery from '@hooks/queries/chat/useChatChannelQuery';
import useCreateChatChannelMutation from '@hooks/queries/chat/useCreateChatChannelMutation';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import useSocketStore from '@stores/socketStore';
import * as S from './ChatPage.styled';

const ChatPage = () => {
	const [selectedChat, setSelectedChat] = useState(0);
	const { userStatus } = useUserStatusQuery();
	const [chatRoomModal, setChatRoomModal] = useState(false);
	const [teamspaceName, setTeamspaceName] = useState('');
	const [nameError, setNameError] = useState('');
	const { chatChannel } = useChatChannelQuery(
		userStatus?.profile.lastSeenTeamspaceId
	);
	const { mutateCreateChatChannel } = useCreateChatChannelMutation();
	const { chatChannelList } = useSocketStore();

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setTeamspaceName(value);
	};

	const handleCancleClick = () => {
		setChatRoomModal(false);
		setTeamspaceName('');
		setNameError('');
	};

	const checkTeamSpaceName = () => {
		if (teamspaceName.length === 0)
			setNameError('팀스페이스 이름은 공백일 수 없습니다.');
		else if (teamspaceName.length < 2)
			setNameError('팀스페이스 이름은 2글자 이상입니다.');
		else {
			setNameError('');
			return true;
		}
		return false;
	};

	const handlCreateClick = () => {
		if (!checkTeamSpaceName()) return;
		mutateCreateChatChannel(
			userStatus!.profile.lastSeenTeamspaceId,
			teamspaceName
		);
		setChatRoomModal(false);
	};

	return (
		<Flex grow='1'>
			<S.ChatRoomListContainer>
				{chatRoomModal && (
					<S.ChatRoomModal>
						<Heading size='xxs'>채팅방 이름을 작성해주세요.</Heading>
						<Flex direction='column' gap='6'>
							<Input
								size='md'
								border='underLine'
								isError={!!nameError}
								maxLength={20}
								value={teamspaceName}
								onChange={handleNameChange}
							/>
							<Flex height='14' align='center'>
								{nameError && (
									<Text size='md' weight='medium' color='danger'>
										{nameError}
									</Text>
								)}
							</Flex>
						</Flex>
						<Flex gap='20'>
							<Flex width='80'>
								<Button
									label='생성'
									variant='primary'
									size='sm'
									isFull
									onClick={handlCreateClick}
								/>
							</Flex>
							<Flex width='80'>
								<Button
									label='취소'
									variant='destructive'
									size='sm'
									isFull
									onClick={handleCancleClick}
								/>
							</Flex>
						</Flex>
					</S.ChatRoomModal>
				)}
				<S.ChatRoomListWrapper>
					{chatChannelList.length > 0
						? chatChannelList.map((chat) => (
								<ChatRoom
									key={chat.id}
									id={chat.id}
									title={chat.name}
									message={chat.lastChatMessage}
									date={chat.lastChatCreatedAt}
									count={chat.unreadMessageCount}
									selectedChat={selectedChat}
									setSelectedChat={setSelectedChat}
								/>
							))
						: chatChannel &&
							chatChannel.chatChannels &&
							chatChannel.chatChannels.map((chat) => {
								return (
									<ChatRoom
										key={chat.id}
										id={chat.id}
										title={chat.name}
										message={chat.lastChatMessage}
										date={chat.lastChatCreatedAt}
										count={chat.unreadMessageCount}
										selectedChat={selectedChat}
										setSelectedChat={setSelectedChat}
									/>
								);
							})}
				</S.ChatRoomListWrapper>
				<Flex
					paddingBottom='24'
					paddingTop='24'
					paddingLeft='10'
					paddingRight='10'>
					<Button
						label='채팅방 생성'
						variant='secondary'
						size='lg'
						isFull
						onClick={() => setChatRoomModal(true)}
					/>
				</Flex>
			</S.ChatRoomListContainer>
			{selectedChat !== 0 && (
				<Chatting selectedChat={selectedChat} key={selectedChat} />
			)}
		</Flex>
	);
};

export default ChatPage;
