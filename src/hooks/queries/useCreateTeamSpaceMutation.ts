import { useNavigate } from 'react-router-dom';
import postCreateTeamSpace from '@apis/teamspace/postCreateTeamSpace';
import postUserLastSeen from '@apis/user/postUserLastSeen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATH } from '@constants/path';

const useCreateTeamSpaceMutation = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const postCreateTeamSpaceMutation = useMutation({
		mutationFn: postCreateTeamSpace,
		onSuccess: (teamspaceId) => {
			postUserLastSeen(teamspaceId);
			queryClient.invalidateQueries({ queryKey: ['userStatus'] });
			navigate(PATH.FEED);
		},
		onError: (error) => {
			throw error;
		},
	});

	return { mutatePostCreateTeamSpace: postCreateTeamSpaceMutation.mutate };
};
export default useCreateTeamSpaceMutation;
