import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const deleteUserProfile = async () => {
	const response = await axiosInstance.delete(
		`${END_POINTS.USERSETTING}/profile-image`
	);

	return response.data;
};

export default deleteUserProfile;
