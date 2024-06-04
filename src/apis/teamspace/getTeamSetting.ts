import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { TeamSetting } from '@type/team';

const getTeamSetting = async (teamspaceId: number): Promise<TeamSetting> => {
	const response = await axiosInstance.get(
		`${END_POINTS.TEAMSPACE}/${teamspaceId}/settings`
	);

	return response.data.content;
};

export default getTeamSetting;
