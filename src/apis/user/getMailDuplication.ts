import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const getMailDuplication = async (email: string) => {
	await axiosInstance.get(END_POINTS.AUTHDUPLICATION, {
		params: { email },
		authRequired: false,
	});

	return email;
};

export default getMailDuplication;
