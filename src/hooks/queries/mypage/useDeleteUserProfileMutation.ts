import deleteUserProfile from '@apis/user/deleteUserProfile';
import { useMutation } from '@hooks/queries/common/useMutation';

const useDeleteUserProfileMutation = () => {
	const { mutate } = useMutation({});

	const mutateDeleteUserProfile = async () => {
		await mutate(() => deleteUserProfile());
	};

	return { mutateDeleteUserProfile };
};
export default useDeleteUserProfileMutation;
