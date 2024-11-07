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
			setNameError('팀스페이스 이름은 공백일 수 없습니다.');
		else if (teamspaceName.length < 2)
			setNameError('팀스페이스 이름은 2글자 이상입니다.');
		else if (teamspaceName.length > 15)
			setNameError('팀스페이스 이름은 15글자 이하입니다.');
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
		</S.ChatRoomCreationModalContainer>
	);
};

export default ChatRoomCreationModal;
