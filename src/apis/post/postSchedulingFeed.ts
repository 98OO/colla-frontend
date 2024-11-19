import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { SchedulingFeedForm } from '@type/feed';

const postFeed = async (
	{ title, details }: SchedulingFeedForm,
	teamspaceId: number
) => {
	const response = await axiosInstance.post(
		`${END_POINTS.POST_SCHEDULING_FEED(teamspaceId)}`,
		{
			title,
			details,
		}
	);

	return response.data;
};

export default postFeed;
