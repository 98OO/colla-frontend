import getTeamSpaceUser from '@apis/teamspace/getTeamSpaceUser';
import { useQuery } from '@tanstack/react-query';
import type { TeamSpaceUserList } from '@type/user';

const useTeamSpaceUsersQuery = (teamspaceId?: number) => {
	const { data: teamSpaceUsers } = useQuery<TeamSpaceUserList>({
		queryKey: ['teamSpaceUsers'],
		queryFn: () => getTeamSpaceUser(teamspaceId!),
		gcTime: 60 * 60 * 60 * 1000,
		staleTime: 60 * 60 * 60 * 1000,
		enabled: !!teamspaceId,
	});

	return { teamSpaceUsers };
};

export default useTeamSpaceUsersQuery;
