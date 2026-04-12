import postAddTeamSpaceRole from '@apis/teamspace/postAddTeamSpaceRole';
import { useMutation } from '@hooks/queries/common/useMutation';
import { useQueryClient } from '@tanstack/react-query';
import useToastStore from '@stores/toastStore';

const useTeamSpaceRoleMutation = () => {
	const { makeToast } = useToastStore();
	const queryClient = useQueryClient();

	const handleAddTeamSpaceRoleSuccess = () => {
		makeToast('팀스페이스 역할 추가가 완료됬습니다.', 'Success');
		queryClient.invalidateQueries({ queryKey: ['teamSetting'] });
	};

	const { mutate } = useMutation({
		onSuccess: handleAddTeamSpaceRoleSuccess,
	});

	const mutateAddTeamSpaceRole = async (
		teamspaceId: number,
		roleName: string
	) => {
		await mutate(() => postAddTeamSpaceRole(teamspaceId, roleName));
	};

	return { mutateAddTeamSpaceRole };
};

export default useTeamSpaceRoleMutation;
