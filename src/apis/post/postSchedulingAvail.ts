import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const postSchedulingAvail = async (
	teamspaceId: number,
	feedId: number,
	availabilities: Record<string, number[]>
) => {
	const response = await axiosInstance.put(
		`${END_POINTS.SCHEDULING_AVAIL(teamspaceId, feedId)}`,
		{
			availabilities,
		}
	);

	return response.data;
};

export default postSchedulingAvail;
