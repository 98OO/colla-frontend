import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { UserAvailability } from '@type/feed';

const putSchedulingAvailability = async (
	teamspaceId: number,
	feedId: number,
	availabilities: UserAvailability
) => {
	const response = await axiosInstance.put(`${END_POINTS.SCHEDULING_AVAIL(teamspaceId, feedId)}`, {
		availabilities,
	});

	return response.data;
};

export default putSchedulingAvailability;
