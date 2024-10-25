import { useState } from 'react';
import ChatRoom from '@components/Chat/ChatRoom/ChatRoom';
import ChatRoomCreationModal from '@components/Chat/ChatRoom/ChatRoomCreationModal/ChatRoomCreationModal';
import Chatting from '@components/Chat/Chatting/Chatting';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
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
						onClick={() => setIsChatRoomModalOpen(true)}
					/>
				</Flex>
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
