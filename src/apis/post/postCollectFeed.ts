import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { CollectFeedForm } from '@type/feed';

const postCollectFeed = async ({
	teamspaceId,
	title,
	images,
	attachments,
	details,
}: CollectFeedForm) => {
	const response = await axiosInstance.post(
		`${END_POINTS.POST_COLLECT_FEED(teamspaceId)}`,
		{
			title,
			images,
			attachments,
			details,
		}
	);

	return response.data;
};

export default postCollectFeed;
