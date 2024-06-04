import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const postCreateTeamSpace = async (teamName: string) => {
	const response = await axiosInstance.post(`${END_POINTS.TEAMSPACE}`, {
		teamspaceName: teamName,
	});

	return response.data.content.teamspaceId;
};

export default postCreateTeamSpace;
