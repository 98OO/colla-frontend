import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

type OauthLoginData = {
	code: string;
	provider: string;
};

const postOauthLogin = async (props: OauthLoginData) => {
	const response = await axiosInstance.post(
		`${END_POINTS.OAUTHSIGNIN}/${props.provider}/code`,
		{
			code: props.code,
		},
		{
			skipAuthorizationHeader: true,
		}
	);

	return response.data.content;
};

export default postOauthLogin;
