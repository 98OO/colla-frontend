import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const patchComment = async (
	teamspaceId: number,
	feedId: number,
	commentId: number,
	content: string
) => {
	const response = await axiosInstance.patch(
		`${END_POINTS.COMMENT(teamspaceId, feedId, commentId)}`,
		{
			content,
		}
	);

	return response.data;
};

export default patchComment;
