import { useState, ChangeEvent, useEffect } from 'react';
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
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ACCESS_TOKEN } from '@constants/api';
import * as S from './ChatPage.styled';

const ChatPage = () => {
	const [selectedChat, setSelectedChat] = useState(0);
	const { userStatus } = useUserStatusQuery();
	const [teamspaceModal, setTeamspaceModal] = useState(false);
	const [teamspaceName, setTeamspaceName] = useState('');
	const [nameError, setNameError] = useState('');
	const { chatChannel } = useChatChannelQuery(
		userStatus?.profile.lastSeenTeamspaceId
	);
	const { mutateCreateChatChannel } = useCreateChatChannelMutation();

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setTeamspaceName(value);
	};

	const handleCancleClick = () => {
		setTeamspaceModal(false);
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
		setTeamspaceModal(false);
	};

	const [stompClient, setStompClient] = useState<CompatClient | null>(null);

	const onConnected = () => {
		const client = Stomp.over(function () {
			return new SockJS(
				`http://52.78.169.30/ws-stomp?accessToken=${localStorage.getItem(ACCESS_TOKEN)}`
			);
		});

		client.connect({}, () => {
			setStompClient(client);
		});
	};

	useEffect(() => {
		onConnected();
	}, []);

	return (
		<Flex>
			<S.ChatRoomListContainer>
				{teamspaceModal && (
					<S.ChatRoomModal>
						<Heading size='xxs'>팀스페이스 이름을 작성해주세요.</Heading>
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
					{chatChannel &&
						chatChannel.chatChannels &&
						chatChannel.chatChannels.map((chat) => (
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
						))}
				</S.ChatRoomListWrapper>
				<Flex
					paddingBottom='24'
					paddingTop='24'
					paddingLeft='10'
					paddingRight='10'>
					<Button
						label='팀스페이스 생성'
						variant='primary'
						size='lg'
						isFull
						onClick={() => setTeamspaceModal(true)}
					/>
				</Flex>
			</S.ChatRoomListContainer>
			{selectedChat && stompClient && (
				<Chatting selectedChat={selectedChat} stompClient={stompClient} />
			)}
		</Flex>
	);
};

export default ChatPage;
