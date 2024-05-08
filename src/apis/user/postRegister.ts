import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

interface registerData {
	username: string;
	email: string;
	password: string;
	verifyCode: string;
}

const postRegister = async (props: registerData) => {
	const response = await axiosInstance.post(
		`${END_POINTS.AUTHREGISTER}`,
		{
			username: props.username,
			email: props.email,
			password: props.password,
			verifyCode: props.verifyCode,
		},
		{
			authRequired: false,
		}
	);

	return response.data;
};

export default postRegister;
