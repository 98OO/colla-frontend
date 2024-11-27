import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { NewToken } from '@type/user';

export const getNewToken = async () => {
	const { data } = await axiosInstance.get<NewToken>(END_POINTS.NEWTOKEN, {
		authRequired: false,
	});

	const { content } = data;

	return content;
};
