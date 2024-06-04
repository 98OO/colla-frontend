import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const getChatMessage = async (
	teamspaceId: number,
	chatChannelId: number,
	before?: number
) => {
	const url = before
		? `${END_POINTS.TEAMSPACE}/${teamspaceId}/chat-channels/${chatChannelId}/messages?before=${before}&limit=50`
		: `${END_POINTS.TEAMSPACE}/${teamspaceId}/chat-channels/${chatChannelId}/messages?limit=50`;

	const response = await axiosInstance.get(url);
	return response.data.content;
};

export default getChatMessage;
