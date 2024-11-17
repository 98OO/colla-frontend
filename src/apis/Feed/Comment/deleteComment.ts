import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const deleteComment = async (
	teamspaceId: number,
	feedId: number,
	commentId: number
) => {
	const response = await axiosInstance.delete(
		`${END_POINTS.COMMENT(teamspaceId, feedId, commentId)}`
	);

	return response.data;
};

export default deleteComment;
