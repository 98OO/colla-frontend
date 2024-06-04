import { useNavigate } from 'react-router-dom';
import getTeamSpaceInformation from '@apis/teamspace/getTeamSpaceInformation';
import postParticipateTeamSpace from '@apis/teamspace/postParticipateTeamSpace';
import postUserLastSeen from '@apis/user/postUserLastSeen';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATH } from '@constants/path';

const useParticipateTeamSpaceMutation = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const postParticipateTeamSpaceMutation = useMutation({
		mutationFn: (teamCode: string) => getTeamSpaceInformation(teamCode),
		onSuccess: async (content, teamCode) => {
			if (!content.isParticipated) {
				await postParticipateTeamSpace(content.teamspaceId, teamCode);
			}
			postUserLastSeen(content.teamspaceId);
			queryClient.invalidateQueries({ queryKey: ['userStatus'] });
			navigate(PATH.FEED);
		},
		onError: (error) => {
			throw error;
		},
	});

	return {
		mutateParticipateTeamSpace: postParticipateTeamSpaceMutation.mutateAsync,
	};
};
export default useParticipateTeamSpaceMutation;
