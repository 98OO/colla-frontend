import Avatar from '@components/common/Avatar/Avatar';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Text from '@components/common/Text/Text';
import { getFormattedDate } from '@utils/getFormattedDate';
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
			<Flex align='center'>
				<Avatar profile={null} initial={title} size='lg' shape='circle' />
			</Flex>
			<S.MessageContainer>
				<Heading size='xs'>{title}</Heading>
				{message && (
					<Text size='md' weight='medium' color='secondary'>
						{message}
					</Text>
				)}
			</S.MessageContainer>
			<Flex direction='column' justify='space-between'>
				<S.DateWrapper>
					{date && (
						<Text size='sm' weight='medium' color='secondary'>
							{getFormattedDate(date, 'fullDate')}
						</Text>
					)}
				</S.DateWrapper>
				{count !== 0 && count && (
					<Flex justify='flex-end'>
						{!(id === selectedChat) && (
							<S.ChatCountWrapper>
								<Text size='md' weight='medium' color='iInverse'>
									{count > 99 ? '99+' : count.toString()}
								</Text>
							</S.ChatCountWrapper>
						)}
					</Flex>
				)}
			</Flex>
		</S.ChatRoomContainer>
	);
};

export default ChatRoom;
