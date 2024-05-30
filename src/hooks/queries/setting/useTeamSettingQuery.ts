import getTeamSetting from '@apis/teamspace/getTeamSetting';
import { useQuery } from '@tanstack/react-query';
import { TeamSetting } from '@type/team';

const useTeamSettingQuery = (teamspaceId?: number) => {
	const { data: teamSetting } = useQuery<TeamSetting>({
		queryKey: ['teamSetting'],
		queryFn: () => getTeamSetting(teamspaceId!),
		gcTime: 60 * 60 * 60 * 1000,
		staleTime: 60 * 60 * 60 * 1000,
		enabled: !!teamspaceId,
	});

	return { teamSetting };
};

export default useTeamSettingQuery;
