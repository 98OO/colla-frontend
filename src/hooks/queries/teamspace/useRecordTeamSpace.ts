import postUserLastSeen from '@apis/user/postUserLastSeen';
import { useMutation } from '@hooks/queries/common/useMutation';
import { useQueryClient } from '@tanstack/react-query';

const useRecordTeamSpace = () => {
	const queryClient = useQueryClient();

	const handleSettingSucess = () => {
		queryClient.invalidateQueries({ queryKey: ['userStatus'] });
		queryClient.invalidateQueries({ queryKey: ['teamSetting'] });
		queryClient.refetchQueries({ queryKey: ['chatChannel'] });
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
