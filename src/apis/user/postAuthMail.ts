import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const postAuthMail = async (email: string) => {
	const response = await axiosInstance.post(
		`${END_POINTS.AUTHMAILSEND}`,
		{
			email,
		},
		{
			authRequired: false,
		}
	);

	return response.data;
};

export default postAuthMail;
