import { refreshInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { NewToken } from '@type/user';

export const getNewToken = async () => {
	const { data } = await refreshInstance.get<NewToken>(END_POINTS.NEWTOKEN);

	const { content } = data;

	return content;
};
