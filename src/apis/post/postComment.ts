import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const postComment = async (
	teamspaceId: number,
	feedId: number,
	content: string
) => {
	if (!teamspaceId) throw new Error('teamspaceId가 존재하지 않습니다.');

	const response = await axiosInstance.post(
		`${END_POINTS.POST_COMMENT(teamspaceId, feedId)}`,
		{
			content,
		}
	);

	return response.data;
};

export default postComment;
