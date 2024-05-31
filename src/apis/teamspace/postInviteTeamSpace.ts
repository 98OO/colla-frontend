import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const postInviteTeamSpace = async (teamspaceId: number, email: string) => {
	const response = await axiosInstance.post(
		`${END_POINTS.TEAMSPACE}/${teamspaceId}/invitations/mails`,
		{ email }
	);

	return response.data;
};

export default postInviteTeamSpace;
