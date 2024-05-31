import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { TeamSpaceUserList } from '@type/user';

const getTeamSpaceUser = async (
	teamspaceId: number
): Promise<TeamSpaceUserList> => {
	const response = await axiosInstance.get(
		`${END_POINTS.TEAMSPACE}/${teamspaceId}/users`
	);

	return response.data.content;
};

export default getTeamSpaceUser;
