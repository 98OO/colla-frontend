import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const deleteTeamProfile = async (teamspaceId: number) => {
	const response = await axiosInstance.delete(
		`${END_POINTS.TEAMSPACE}/${teamspaceId}/settings/profile-image`
	);

	return response.data;
};

export default deleteTeamProfile;
