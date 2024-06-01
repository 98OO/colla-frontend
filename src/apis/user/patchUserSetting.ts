import { UserProfile } from '@type/user';
import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const patchUserSetting = async (mySetting: Partial<UserProfile>) => {
	const response = await axiosInstance.patch(
		`${END_POINTS.USERSETTING}`,
		mySetting
	);

	return response.data;
};

export default patchUserSetting;
