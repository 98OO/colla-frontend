import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

type FormData = {
	email: string;
	password: string;
};

const postLogin = async (props: FormData) => {
	const response = await axiosInstance.post(
		`${END_POINTS.SIGNIN}`,
		{
			email: props.email,
			password: props.password,
		},
		{
			authRequired: false,
		}
	);

	return response.data.content;
};

export default postLogin;
