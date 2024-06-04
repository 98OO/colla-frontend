import Avatar from '@components/common/Avatar/Avatar';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Text from '@components/common/Text/Text';
import * as S from './ChatRoom.styled';

export interface ChatRoomProps {
	id: number;
	title: string;
	message: string | null;
	date: string | null;
	count?: number;
	selectedChat: number;
	setSelectedChat: (state: number) => void;
}

const ChatRoom = (props: ChatRoomProps) => {
	const { id, title, message, date, count, selectedChat, setSelectedChat } =
		props;

	const handleClick = () => {
		setSelectedChat(id);
	};

	return (
		<S.ChatRoomContainer onClick={handleClick} active={id === selectedChat}>
			<Flex gap='10'>
				<Avatar profile={null} initial={title} size='lg' shape='circle' />
				<Flex direction='column' gap='6' justify='center'>
					<Heading size='xs'>{title}</Heading>
					<Flex height='16'>
						{message && (
							<Text size='md' weight='medium' color='secondary'>
								{message}
							</Text>
						)}
					</Flex>
				</Flex>
			</Flex>
			<Flex direction='column' justify='space-between'>
				<Flex>
					{date && (
						<Text size='sm' weight='medium' color='secondary'>
							{date}
						</Text>
					)}
				</Flex>
				{count !== 0 && count && (
					<Flex justify='flex-end'>
						<S.ChatCountWrapper>
							<Text size='md' weight='medium' color='iInverse'>
								{count > 99 ? '99+' : count.toString()}
							</Text>
						</S.ChatCountWrapper>
					</Flex>
				)}
			</Flex>
		</S.ChatRoomContainer>
	);
};

export default ChatRoom;
