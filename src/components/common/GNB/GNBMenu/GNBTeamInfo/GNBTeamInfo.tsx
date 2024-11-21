import { useNavigate } from 'react-router-dom';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Icon from '@components/common/Icon/Icon';
import Input from '@components/common/Input/Input';
import Profile from '@components/common/Profile/Profile';
import Text from '@components/common/Text/Text';
import useInviteTeamSpace from '@hooks/queries/teamspace/useInviteTeamSpaceMutation';
import useTeamSpaceCode from '@hooks/queries/teamspace/useTeamSpaceCodeMutation';
import useTeamSpaceUsersQuery from '@hooks/queries/teamspace/useTeamSpaceUsersQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import useForm from '@hooks/user/useForm';
import { PATH } from '@constants/path';
import * as S from './GNBTeamInfo.styled';

const GNBTeamInfo = () => {
	const { userStatus } = useUserStatusQuery();
	const { teamSpaceUsers } = useTeamSpaceUsersQuery(
		userStatus?.profile.lastSeenTeamspaceId
	);
	const { mutateInviteTeamSpace } = useInviteTeamSpace();
	const { mutateTeampSpaceCode } = useTeamSpaceCode();
	const navigate = useNavigate();

	const lastSeenTeam = userStatus?.participatedTeamspaces.find(
		(team) => team.teamspaceId === userStatus?.profile.lastSeenTeamspaceId
	);
	const teamRole = userStatus?.participatedTeamspaces?.find(
		(teamspace) =>
			teamspace.teamspaceId === userStatus?.profile.lastSeenTeamspaceId
	)?.teamspaceRole;

	const { formData, submitting, errors, register, handleSubmit } = useForm({
		onSubmit: async () => {
			if (userStatus?.profile.lastSeenTeamspaceId !== undefined) {
				await mutateInviteTeamSpace(
					userStatus?.profile.lastSeenTeamspaceId,
					formData.email
				);
			}
		},
	});
	const validationRules = {
		email: {
			required: '이메일을 입력해주세요.',
			pattern: {
				regExp: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
				message: '유효한 이메일을 입력해주세요.',
			},
		},
	};

	return (
		<S.GNBTeamInfoContainer>
			{userStatus && lastSeenTeam && (
				<>
					<Flex direction='column' gap='4'>
						<Flex
							paddingTop='4'
							paddingBottom='4'
							paddingLeft='12'
							paddingRight='12'>
							<Text size='md' weight='semiBold' color='tertiary'>
								팀 정보
							</Text>
						</Flex>
						<Divider size='sm' />
					</Flex>
					<Flex
						direction='column'
						paddingTop='10'
						paddingBottom='10'
						paddingLeft='16'
						paddingRight='16'
						gap='20'>
						<S.InviteContainer onSubmit={handleSubmit}>
							<Flex gap='8'>
								<S.InputWrapper>
									<Input
										size='md'
										placeholder='사용자, 이메일 추가'
										maxLength={255}
										isError={errors?.email?.isError}
										{...register('email', validationRules.email, false)}
									/>
								</S.InputWrapper>
								<Flex width='64'>
									<Button
										label='초대'
										variant='primary'
										size='md'
										isFull
										disabled={submitting}
										type='submit'
									/>
								</Flex>
							</Flex>
							{errors.email?.isError && (
								<Text size='sm' weight='regular' color='danger'>
									{errors.email.message}
								</Text>
							)}
						</S.InviteContainer>
						<Flex direction='column' gap='8'>
							<Text size='md' weight='semiBold'>
								{`총 ${lastSeenTeam.numOfParticipants}명의 팀원`}
							</Text>
							<S.TeamSpaceUserContainer>
								{teamSpaceUsers &&
									teamSpaceUsers.users.map((user) => (
										<Profile
											key={user.id}
											profile={user.profileImageUrl}
											initial={user.username}
											avatarSize='lg'
											title={user.username}
											titleSize='lg'
											titleWeight='bold'
											text={user.email}
											trailingText={user.role === 'LEADER' ? '팀장' : '팀원'}
										/>
									))}
							</S.TeamSpaceUserContainer>
						</Flex>
					</Flex>
					<Divider size='sm' padding={4} />
					<Flex paddingLeft='16' paddingRight='16' justify='space-between'>
						<Flex>
							{teamRole === 'LEADER' && (
								<S.FooterWrapper onClick={() => navigate(PATH.SETTING)}>
									<Icon name='Settings' size='sm' color='iSecondary' />
									<Text size='md' weight='medium' color='secondary'>
										설정
									</Text>
								</S.FooterWrapper>
							)}
						</Flex>
						<S.FooterWrapper
							onClick={() => mutateTeampSpaceCode(lastSeenTeam.teamspaceId)}>
							<Icon name='Link' size='sm' color='iSecondary' />
							<Text size='md' weight='medium' color='secondary'>
								초대 코드
							</Text>
						</S.FooterWrapper>
					</Flex>
				</>
			)}
		</S.GNBTeamInfoContainer>
	);
};

export default GNBTeamInfo;
