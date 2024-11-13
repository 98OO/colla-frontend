import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { NormalFeedForm } from '@type/feed';

const postNormalFeed = async ({
	teamspaceId,
	title,
	images,
	details,
}: NormalFeedForm) => {
	const response = await axiosInstance.post(
		`${END_POINTS.POST_NORMAL_FEED(teamspaceId)}`,
		{
			title,
			images,
			details,
		}
	);

	return response.data;
};

export default postNormalFeed;
