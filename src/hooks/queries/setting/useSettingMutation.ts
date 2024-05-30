import patchSettingCorrection from '@apis/teamspace/patchSettingCorrection';
import { useMutation } from '@hooks/queries/common/useMutation';
import { useQueryClient } from '@tanstack/react-query';
import { TeamSettingResult } from '@type/team';
import useToastStore from '@stores/toastStore';

const useSettingMutation = () => {
	const { makeToast } = useToastStore();
	const queryClient = useQueryClient();

	const handleSettingSucess = () => {
		makeToast('팀 설정 수정이 완료됬습니다.', 'Success');
		queryClient.invalidateQueries({ queryKey: ['teamSetting'] });
		queryClient.invalidateQueries({ queryKey: ['userStatus'] });
	};

	const { mutate } = useMutation({
		onSuccess: handleSettingSucess,
	});

	const mutateSetting = async (
		teamspaceId: number,
		teamSetting: TeamSettingResult
	) => {
		await mutate(() => patchSettingCorrection(teamspaceId, teamSetting));
	};

	return { mutateSetting };
};
export default useSettingMutation;
