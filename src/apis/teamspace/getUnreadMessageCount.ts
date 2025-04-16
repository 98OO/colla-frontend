import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { UnreadMessageCountResponse } from '@type/team';

const getUnreadMessageCount = async (
	teamspaceId: number
): Promise<UnreadMessageCountResponse> => {
	const response = await axiosInstance.get(
		END_POINTS.GET_UNREAD_MESSAGE_COUNT(teamspaceId)
	);

	return response.data.content;
};

export default getUnreadMessageCount;
