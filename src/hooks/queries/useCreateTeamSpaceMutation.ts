import { useNavigate } from 'react-router-dom';
import postCreateTeamSpace from '@apis/teamspace/postCreateTeamSpace';
import useRecordTeamSpace from '@hooks/queries/teamspace/useRecordTeamSpace';
import { useMutation } from '@tanstack/react-query';
import useSocketStore from '@stores/socketStore';
import { PATH } from '@constants/path';

const useCreateTeamSpaceMutation = () => {
	const navigate = useNavigate();
	const { setChatChannelList } = useSocketStore();
	const { mutateRecordTeamSpace } = useRecordTeamSpace();

	const postCreateTeamSpaceMutation = useMutation({
		mutationFn: postCreateTeamSpace,
		onSuccess: (teamspaceId) => {
			mutateRecordTeamSpace(teamspaceId);
			setChatChannelList([]);
			navigate(PATH.FEED);
		},
		onError: (error) => {
			throw error;
		},
	});

	return { mutatePostCreateTeamSpace: postCreateTeamSpaceMutation.mutate };
};
export default useCreateTeamSpaceMutation;
