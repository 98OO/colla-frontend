import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

type OauthLoginData = {
	code: string;
	provider: string;
};

const postOauthLogin = async (props: OauthLoginData) => {
	const response = await axiosInstance.post(
		`${END_POINTS.OAUTHSIGNIN}/${props.provider}`,
		{
			code: props.code,
		},
		{
			authRequired: false,
		}
	);

	return response.data.content;
};

export default postOauthLogin;
