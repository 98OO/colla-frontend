import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

interface RequestConfig {
	authRequired?: boolean;
}

const getTeamSpaceInformation = async (
	teamCode: string,
	config: RequestConfig = { authRequired: true }
) => {
	const response = await axiosInstance.get(
		`${END_POINTS.TEAMSPACE}?code=${teamCode}`,
		{
			authRequired: config.authRequired,
		}
	);

	return response.data.content;
};

export default getTeamSpaceInformation;
