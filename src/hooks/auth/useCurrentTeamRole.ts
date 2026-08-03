import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';

const useCurrentTeamRole = () => {
	const { userStatus } = useUserStatusQuery();

	const currentTeam = userStatus?.participatedTeamspaces.find(
		(teamspace) => teamspace.teamspaceId === userStatus.profile.lastSeenTeamspaceId
	);
	const currentTeamRole = currentTeam?.teamspaceRole ?? null;

	return { userStatus, currentTeamRole };
};

export default useCurrentTeamRole;
