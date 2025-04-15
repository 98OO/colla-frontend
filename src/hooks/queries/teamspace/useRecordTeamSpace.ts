import postUserLastSeen from '@apis/user/postUserLastSeen';
import { useMutation } from '@hooks/queries/common/useMutation';
import { useQueryClient } from '@tanstack/react-query';

const useRecordTeamSpace = () => {
	const queryClient = useQueryClient();

	const handleSettingSucess = () => {
		queryClient.invalidateQueries({ queryKey: ['userStatus'] });
		queryClient.removeQueries({ queryKey: ['teamSetting'] });
		queryClient.removeQueries({ queryKey: ['teamSpaceUsers'] });
		queryClient.removeQueries({ queryKey: ['chatChannel'] });
		queryClient.removeQueries({ queryKey: ['unreadMessage'] });
	};

	const { mutate } = useMutation({
		onSuccess: handleSettingSucess,
	});

	const mutateRecordTeamSpace = async (teamspaceId: number) => {
		await mutate(() => postUserLastSeen(teamspaceId));
	};

	return { mutateRecordTeamSpace };
};
export default useRecordTeamSpace;
