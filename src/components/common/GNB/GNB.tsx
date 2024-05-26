import Avatar from '@components/common/Avatar/Avatar';
import { Button } from '@components/common/Button/Button';
import Heading from '@components/common/Heading/Heading';
import IconButton from '@components/common/IconButton/IconButton';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import * as S from './GNB.styled';

const GNB = () => {
	const { userStatus } = useUserStatusQuery();
	const lastSeenTeamspaceId = userStatus?.profile.lastSeenTeamspaceId;
	const lastSeenTeam = userStatus?.participatedTeamspaces.find(
		(team) => team.teamspaceId === lastSeenTeamspaceId
	);

	return (
		<S.GNBContainer>
			{userStatus && lastSeenTeam && (
				<>
					<S.LeftContainer onClick={() => ''}>
						<Avatar
							profile={lastSeenTeam.profileImageUrl}
							initial={lastSeenTeam.name}
							size='lg'
							shape='rect'
						/>
						<Heading size='md'>팀이름</Heading>
						<IconButton icon='Updown' ariaLabel='Updown' onClick={() => ''} />
					</S.LeftContainer>
					<S.RightContainer>
						<IconButton
							icon='Bell'
							ariaLabel='Bell'
							color='iSecondary'
							onClick={() => ''}
						/>
						<IconButton icon='Search' ariaLabel='Search' onClick={() => ''} />
						<S.ProfileContainer>
							<Button
								label='초대'
								variant='secondary'
								size='sm'
								leadingIcon='User'
								onClick={() => ''}
							/>
							<Avatar
								profile={userStatus.profile.profileImageUrl}
								initial={userStatus.profile.username}
								size='md'
								shape='circle'
							/>
						</S.ProfileContainer>
					</S.RightContainer>
				</>
			)}
		</S.GNBContainer>
	);
};

export default GNB;
