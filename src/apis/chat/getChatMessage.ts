import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

export interface GetChatsParams {
	teamspaceId: number | undefined;
	chatChannelId: number;
	before?: number;
	limit?: number;
}

const getChatMessage = async ({
	teamspaceId,
	chatChannelId,
	limit = 30,
	before,
}: GetChatsParams) => {
	const url = END_POINTS.CHATS(teamspaceId!, chatChannelId);
	const params: { before?: number; limit?: number } = { limit };

	if (before) {
		params.before = before;
	}

	const response = await axiosInstance.get(url, { params });
	return response.data.content;
};

export default getChatMessage;
