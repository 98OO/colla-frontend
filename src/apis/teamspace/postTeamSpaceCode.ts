import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const postTeamSpaceCode = async (teamspaceId: number) => {
	const response = await axiosInstance.post(
		`${END_POINTS.TEAMSPACE}/${teamspaceId}/invitations`
	);

	return response.data.content.inviteCode;
};

export default postTeamSpaceCode;
