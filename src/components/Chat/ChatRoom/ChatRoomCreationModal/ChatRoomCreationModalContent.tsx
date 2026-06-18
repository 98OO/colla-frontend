import { ChangeEvent, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Input from '@components/common/Input/Input';
import Text from '@components/common/Text/Text';
import useCreateChatChannelMutation from '@hooks/queries/chat/useCreateChatChannelMutation';
import { useLastSeenTeamspaceId } from '@hooks/user/useLastSeenTeamspaceId';
import * as S from './ChatRoomCreationModalContent.styled';

interface ChatRoomCreationModalContentProps {
	setIsChatRoomModalOpen: (value: boolean) => void;
}

const CHAT_ROOM_CREATION_NAME_RULES = {
	EMPTY: '채팅방 이름은 공백일 수 없습니다.',
	TOO_SHORT: '채팅방 이름은 2글자 이상입니다.',
	TOO_LONG: '채팅방 이름은 15글자 이하입니다.',
};

const ChatRoomCreationModalContent = ({
	setIsChatRoomModalOpen,
}: ChatRoomCreationModalContentProps) => {
	const [chatRoomName, setChatRoomName] = useState('');
	const [nameError, setNameError] = useState('');
	const lastSeenTeamspaceId = useLastSeenTeamspaceId();
	const { mutateCreateChatChannel } = useCreateChatChannelMutation();

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setChatRoomName(value);
	};

	const handleCancelClick = () => {
		setIsChatRoomModalOpen(false);
	};

	const checkChatRoomName = () => {
		const trimmedChatRoomName = chatRoomName.trim();

		if (trimmedChatRoomName.length === 0) setNameError(CHAT_ROOM_CREATION_NAME_RULES.EMPTY);
		else if (trimmedChatRoomName.length < 2) setNameError(CHAT_ROOM_CREATION_NAME_RULES.TOO_SHORT);
		else if (trimmedChatRoomName.length > 15) setNameError(CHAT_ROOM_CREATION_NAME_RULES.TOO_LONG);
		else {
			setNameError('');
			return true;
		}

		return false;
	};

	const handleCreateClick = () => {
		if (!checkChatRoomName()) return;
		if (!lastSeenTeamspaceId) return;

		mutateCreateChatChannel(lastSeenTeamspaceId, chatRoomName.trim());

		setIsChatRoomModalOpen(false);
	};

	return (
		<S.ChatRoomCreationModalContentContainer>
			<Flex marginLeft='20' marginRight='20' marginBottom='12'>
				<Heading size='xxs'>채팅방 만들기</Heading>
			</Flex>
			<Flex direction='column' gap='6' marginLeft='20' marginRight='20'>
				<Input
					size='md'
					placeholder='채팅방 이름을 입력하세요'
					isError={!!nameError}
					maxLength={15}
					value={chatRoomName}
					onChange={handleNameChange}
					onEnterPress={handleCreateClick}
				/>
				<Flex height='14' align='center'>
					{nameError && (
						<Text size='md' weight='medium' color='danger'>
							{nameError}
						</Text>
					)}
				</Flex>
			</Flex>
			<Flex gap='6' justify='right' marginRight='20'>
				<Flex width='60'>
					<Button label='취소' variant='secondary' size='sm' isFull onClick={handleCancelClick} />
				</Flex>
				<Flex width='60'>
					<Button label='만들기' variant='primary' size='sm' isFull onClick={handleCreateClick} />
				</Flex>
			</Flex>
		</S.ChatRoomCreationModalContentContainer>
	);
};

export default ChatRoomCreationModalContent;
