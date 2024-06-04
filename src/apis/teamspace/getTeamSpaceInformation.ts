import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const getTeamSpaceInformation = async (teamCode: string) => {
	const response = await axiosInstance.get(
		`${END_POINTS.TEAMSPACE}?code=${teamCode}`
	);

	return response.data.content;
};

export default getTeamSpaceInformation;
