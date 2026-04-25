import { ChangeEvent, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Input from '@components/common/Input/Input';
import Text from '@components/common/Text/Text';
import useTeamSpaceRoleMutation from '@hooks/queries/teamspace/useTeamSpaceRoleMutation';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import * as S from './RoleAddModalContent.styled';

interface RoleAddModalContentProps {
	setIsRoleAddModalOpen: (value: boolean) => void;
}

const RoleAddModalContent = ({ setIsRoleAddModalOpen }: RoleAddModalContentProps) => {
	const [roleName, setRoleName] = useState('');
	const [nameError, setNameError] = useState('');
	const { userStatus } = useUserStatusQuery();
	const { mutateAddTeamSpaceRole: mutateCreateRole } = useTeamSpaceRoleMutation();

	const handleRoleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setRoleName(value);
	};

	const handleCancelClick = () => {
		setIsRoleAddModalOpen(false);
	};

	const checkRoleName = () => {
		if (roleName.trim().length < 2) setNameError('역할 이름은 2글자 이상입니다.');
		else if (roleName.trim().length > 15) setNameError('역할 이름은 15글자 이하입니다.');
		else {
			setNameError('');
			return true;
		}

		return false;
	};

	const handleAddClick = () => {
		if (!checkRoleName()) return;

		mutateCreateRole(userStatus!.profile.lastSeenTeamspaceId, roleName);
		setIsRoleAddModalOpen(false);
	};

	return (
		<S.RoleAddModalContentContainer>
			<Flex marginLeft='20' marginRight='20' marginBottom='12'>
				<Heading size='xxs'>역할 추가하기</Heading>
			</Flex>
			<Flex direction='column' gap='6' marginLeft='20' marginRight='20'>
				<Input
					size='md'
					placeholder='역할 이름을 입력하세요'
					isError={!!nameError}
					maxLength={15}
					value={roleName}
					onChange={handleRoleNameChange}
					onEnterPress={handleAddClick}
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
					<Button label='추가' variant='primary' size='sm' isFull onClick={handleAddClick} />
				</Flex>
			</Flex>
		</S.RoleAddModalContentContainer>
	);
};

export default RoleAddModalContent;
