import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const postComment = async (
	teamspaceId: number,
	feedId: number,
	content: string
) => {
	const response = await axiosInstance.post(
		`${END_POINTS.POST_COMMENT(teamspaceId, feedId)}`,
		{
			content,
		}
	);

	return response.data;
};

export default postComment;
