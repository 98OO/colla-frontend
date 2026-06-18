import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const postAddTeamSpaceRole = async (teamspaceId: number, tagName: string) => {
	const response = await axiosInstance.post(
		`${END_POINTS.POST_TEAMSPACE_ROLE(teamspaceId)}`,
		{
			tagName,
		}
	);

	return response.data.content.tag;
};

export default postAddTeamSpaceRole;
