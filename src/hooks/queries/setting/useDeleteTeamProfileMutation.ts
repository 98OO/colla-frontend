import deleteTeamProfile from '@apis/teamspace/deleteTeamProfile';
import { useMutation } from '@hooks/queries/common/useMutation';

const useDeleteTeamProfileMutation = () => {
	const { mutate } = useMutation({});

	const mutateDeleteTeamProfile = async (teamspaceId: number) => {
		await mutate(() => deleteTeamProfile(teamspaceId));
	};

	return { mutateDeleteTeamProfile };
};
export default useDeleteTeamProfileMutation;
