import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { AccessToken } from '@type/user';

export const getNewToken = async () => {
	const { data } = await axiosInstance.get<AccessToken>(END_POINTS.NEWTOKEN);

	return data;
};
