import patchUserSetting from '@apis/user/patchUserSetting';
import { useMutation } from '@hooks/queries/common/useMutation';
import { useQueryClient } from '@tanstack/react-query';
import { UserProfile } from '@type/user';
import useToastStore from '@stores/toastStore';

const useUserSettingMutation = () => {
	const { makeToast } = useToastStore();
	const queryClient = useQueryClient();

	const handleUserSettingSucess = () => {
		makeToast('프로필 설정 수정이 완료됬습니다.', 'Success');
		queryClient.invalidateQueries({ queryKey: ['userStatus'] });
	};

	const { mutate } = useMutation({
		onSuccess: handleUserSettingSucess,
	});

	const mutateUserSetting = async (mySetting: Partial<UserProfile>) => {
		await mutate(() => patchUserSetting(mySetting));
	};

	return { mutateUserSetting };
};
export default useUserSettingMutation;
