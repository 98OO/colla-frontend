import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { UserInformation } from '@type/user';

const getUserStatus = async (): Promise<UserInformation> => {
	const response = await axiosInstance.get(`${END_POINTS.USERSTATUS}`, {});

	return response.data.content;
};

export default getUserStatus;
