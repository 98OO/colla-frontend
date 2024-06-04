import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const postCreateChatChannel = async (
	teamspaceId: number,
	ChatChannelName: string
) => {
	const response = await axiosInstance.post(
		`${END_POINTS.TEAMSPACE}/${teamspaceId}/chat-channels`,
		{
			chatChannelName: ChatChannelName,
		}
	);

	return response.data.content;
};

export default postCreateChatChannel;
