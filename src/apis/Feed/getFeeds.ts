import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { FeedType } from '@type/feed';

export interface GetFeedsParams {
	teamspaceId: number | undefined;
	limit?: number;
	after?: number;
	type?: FeedType;
}

export const getFeeds = async ({
	teamspaceId,
	limit = 5,
	after,
	type,
}: GetFeedsParams) => {
	if (!teamspaceId) throw new Error('teamspaceId가 존재하지 않습니다.');

	const params: GetFeedsParams = { teamspaceId, limit };
	if (after) params.after = after;
	if (type) params.type = type;

	const response = await axiosInstance.get(END_POINTS.FEEDS(teamspaceId), {
		params,
	});

	return response.data;
};
