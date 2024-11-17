import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const deleteComment = async (
	teamspaceId: number,
	feedId: number,
	commentId: number
) => {
	if (!teamspaceId) throw new Error('teamspaceId가 존재하지 않습니다.');

	const response = await axiosInstance.delete(
		`${END_POINTS.DELETE_COMMENT(teamspaceId, feedId, commentId)}`
	);

	return response.data;
};

export default deleteComment;
