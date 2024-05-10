import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const postParticipateTeamSpace = async (
	teamSpaceId: string,
	teamCode: string
) => {
	await axiosInstance.post(
		`${END_POINTS.PARTICIPATETEAMSPACE}/${teamSpaceId}/users`,
		{
			inviteCode: teamCode,
		}
	);
};

export default postParticipateTeamSpace;
