import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const postMailVerification = async (email: string, verifyCode: string) => {
	const response = await axiosInstance.post(
		`${END_POINTS.AUTHMAILVERIFICATION}`,
		{
			email,
			verifyCode,
		},
		{
			skipAuthorizationHeader: true,
		}
	);

	return response.data;
};

export default postMailVerification;
