import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { ChatChannels } from '@type/chat';

const getChatChannel = async (teamspaceId: number): Promise<ChatChannels> => {
	const response = await axiosInstance.get(
		`${END_POINTS.TEAMSPACE}/${teamspaceId}/chat-channels`
	);

	return response.data.content;
};

export default getChatChannel;
