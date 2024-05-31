import { useNavigate } from 'react-router-dom';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Icon from '@components/common/Icon/Icon';
import Profile from '@components/common/Profile/Profile';
import Text from '@components/common/Text/Text';
import useRecordTeamSpace from '@hooks/queries/teamspace/useRecorTeamSpace';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { PATH } from '@constants/path';
import * as S from './GNBTeamSpace.syled';

const GNBTeamSpace = () => {
	const { userStatus } = useUserStatusQuery();
	const { mutateRecordTeamSpace } = useRecordTeamSpace();
	const navigate = useNavigate();
	const lastSeenTeam = userStatus?.participatedTeamspaces.find(
		(team) => team.teamspaceId === userStatus?.profile.lastSeenTeamspaceId
	);
	const otherProfiles = userStatus?.participatedTeamspaces.filter(
		(teamSpace) => teamSpace.name !== lastSeenTeam?.name
	);

	const handleTeamChangeClick = (teamSpaceId: number) => {
		mutateRecordTeamSpace(teamSpaceId);
	};

	return (
		<S.GNBTeamSpaceContainer>
			{userStatus && lastSeenTeam && otherProfiles && (
				<>
					<Flex direction='column' gap='4'>
						<Flex
							paddingTop='4'
							paddingBottom='4'
							paddingLeft='12'
							paddingRight='12'>
							<Text size='md' weight='semiBold' color='tertiary'>
								{`${userStatus.profile.username}의 팀스페이스`}
							</Text>
						</Flex>
						<Divider size='sm' />
					</Flex>
					<S.TeamSpacesContainer>
						<S.TeamSpacesWrapper>
							<Profile
								key={lastSeenTeam.teamspaceId}
								profile={lastSeenTeam.profileImageUrl}
								initial={lastSeenTeam.name}
								avatarSize='lg'
								avatarShape='rect'
								title={lastSeenTeam.name}
								titleSize='lg'
								titleWeight='bold'
								text={
									lastSeenTeam.teamspaceRole === 'LEADER'
										? `팀장 - 총 ${lastSeenTeam.numOfParticipants}명의 멤버`
										: '팀원'
								}
								trailingIcon='Check'
							/>
							{otherProfiles.map((teamSpace) => (
								<Profile
									key={teamSpace.teamspaceId}
									profile={teamSpace.profileImageUrl}
									initial={teamSpace.name}
									avatarSize='lg'
									avatarShape='rect'
									title={teamSpace.name}
									titleSize='lg'
									titleWeight='bold'
									text={
										teamSpace.teamspaceRole === 'LEADER'
											? `팀장 - 총 ${teamSpace.numOfParticipants}명의 멤버`
											: '팀원'
									}
									onClick={() => handleTeamChangeClick(teamSpace.teamspaceId)}
								/>
							))}
						</S.TeamSpacesWrapper>
					</S.TeamSpacesContainer>
					<Divider size='sm' padding={4} />
					<Flex paddingLeft='16' paddingRight='16'>
						<S.FooterContainer onClick={() => navigate(PATH.ENTRY)}>
							<Icon name='Home' size='sm' color='iSecondary' />
							<Text size='md' weight='medium' color='secondary'>
								새 팀스페이스 생성 또는 참여
							</Text>
						</S.FooterContainer>
					</Flex>
				</>
			)}
		</S.GNBTeamSpaceContainer>
	);
};

export default GNBTeamSpace;
