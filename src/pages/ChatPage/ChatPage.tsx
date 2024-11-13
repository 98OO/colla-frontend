import { useState } from 'react';
import ChatRoom from '@components/Chat/ChatRoom/ChatRoom';
import ChatRoomCreationModal from '@components/Chat/ChatRoom/ChatRoomCreationModal/ChatRoomCreationModal';
import Chatting from '@components/Chat/Chatting/Chatting';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';
import useChatChannelQuery from '@hooks/queries/chat/useChatChannelQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import useSocketStore from '@stores/socketStore';
import * as S from './ChatPage.styled';

const ChatPage = () => {
	const [selectedChat, setSelectedChat] = useState(0);
	const [isChatRoomModalOpen, setIsChatRoomModalOpen] = useState(false);
	const { userStatus } = useUserStatusQuery();
	const { chatChannel } = useChatChannelQuery(
		userStatus?.profile.lastSeenTeamspaceId
	);
	const { chatChannelList } = useSocketStore();

	return (
		<Flex grow='1'>
			<S.ChatRoomListContainer>
				<S.ChatPageHeader>
					<Flex direction='column' justify='center' gap='4'>
						<Heading size='xxs' color='secondary'>
							채팅
						</Heading>
						<Flex align='center' gap='2'>
							<Text size='sm' weight='regular' color='tertiary'>
								@
							</Text>
							<Text size='sm' weight='regular' color='tertiary'>
								{userStatus?.profile.username ?? ''}
							</Text>
						</Flex>
					</Flex>
					<Flex>
						<IconButton
							icon='Normal'
							size='md'
							color='secondary'
							ariaLabel='채팅방 생성'
							onClick={() => setIsChatRoomModalOpen(true)}
						/>
					</Flex>
				</S.ChatPageHeader>
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
			</S.ChatRoomListContainer>
			{selectedChat !== 0 && (
				<Chatting selectedChat={selectedChat} key={selectedChat} />
			)}
			{isChatRoomModalOpen && (
				<ChatRoomCreationModal
					setIsChatRoomModalOpen={setIsChatRoomModalOpen}
				/>
			)}
		</Flex>
	);
};

export default ChatPage;
