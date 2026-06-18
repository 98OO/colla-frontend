import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';

export const useLastSeenTeamspaceId = () => {
	const { userStatus } = useUserStatusQuery();

	return userStatus?.profile.lastSeenTeamspaceId;
};
