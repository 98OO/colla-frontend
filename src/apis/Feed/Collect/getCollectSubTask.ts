import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { SubTaskResponse } from '@type/feed';

const getCollectSubTask = async (
	teamspaceId: number,
	feedId: number,
	userId: number
): Promise<SubTaskResponse> => {
	const response = await axiosInstance.get(
		`${END_POINTS.GET_COLLECT_SUB_TASK(teamspaceId, feedId, userId)}`
	);

	return response.data.content;
};

export default getCollectSubTask;
