import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

interface RequestConfig {
	skipAuthorizationHeader?: boolean;
}

const getTeamSpaceInformation = async (teamCode: string, config: RequestConfig = {}) => {
	const response = await axiosInstance.get(`${END_POINTS.TEAMSPACE}?code=${teamCode}`, {
		skipAuthorizationHeader: config.skipAuthorizationHeader,
	});

	return response.data.content;
};

export default getTeamSpaceInformation;
