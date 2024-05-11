import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const postUserLastSeen = async (teamspaceId: number) => {
	await axiosInstance.post(`${END_POINTS.USERLASTSEEN}`, {
		teamspaceId,
	});
};

export default postUserLastSeen;
