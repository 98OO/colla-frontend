import { ChangeEvent, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Input from '@components/common/Input/Input';
import Text from '@components/common/Text/Text';
import useOutsideClick from '@hooks/common/useOutSideClick';
import useCreateChatChannelMutation from '@hooks/queries/chat/useCreateChatChannelMutation';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import * as S from './ChatRoomCreationModal.styled';

interface ChatRoomCreationModalProps {
	setIsChatRoomModalOpen: (value: boolean) => void;
}

const ChatRoomCreationModal = ({
	setIsChatRoomModalOpen,
}: ChatRoomCreationModalProps) => {
	const [teamspaceName, setTeamspaceName] = useState('');
	const [nameError, setNameError] = useState('');
	const { userStatus } = useUserStatusQuery();
	const { mutateCreateChatChannel } = useCreateChatChannelMutation();
	const ref = useOutsideClick({
		onClickOutside: () => setIsChatRoomModalOpen(false),
	});

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setTeamspaceName(value);
	};

	const handleCancleClick = () => {
		setIsChatRoomModalOpen(false);
	};

	const checkTeamSpaceName = () => {
		if (teamspaceName.length === 0)
			setNameError('채팅방 이름은 공백일 수 없습니다.');
		else if (teamspaceName.length < 2)
			setNameError('채팅방 이름은 2글자 이상입니다.');
		else if (teamspaceName.length > 15)
			setNameError('채팅방 이름은 15글자 이하입니다.');
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

		setIsChatRoomModalOpen(false);
	};

	return (
		<S.ChatRoomCreationModalContainer ref={ref}>
			<Flex marginLeft='20' marginRight='20' marginBottom='12'>
				<Heading size='xxs'>채팅방 만들기</Heading>
			</Flex>
			<Flex direction='column' gap='6' marginLeft='20' marginRight='20'>
				<Input
					size='md'
					placeholder='채팅방 이름을 입력하세요'
					isError={!!nameError}
					maxLength={15}
					value={teamspaceName}
					onChange={handleNameChange}
					onEnterPress={handlCreateClick}
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
					<Button
						label='취소'
						variant='secondary'
						size='sm'
						isFull
						onClick={handleCancleClick}
					/>
				</Flex>
				<Flex width='60'>
					<Button
						label='만들기'
						variant='primary'
						size='sm'
						isFull
						onClick={handlCreateClick}
					/>
				</Flex>
			</Flex>
		</S.ChatRoomCreationModalContainer>
	);
};

export default ChatRoomCreationModal;
