import postComment from '@apis/Feed/Comment/postComment';
import { useMutation } from '@hooks/queries/common/useMutation';
import { useQueryClient } from '@tanstack/react-query';

const useLeaveCommentMutation = () => {
	const queryClient = useQueryClient();

	const handleLeaveCommentSuccess = () => {
		queryClient.invalidateQueries({ queryKey: ['feeds'] });
	};

	const { mutate } = useMutation({
		onSuccess: handleLeaveCommentSuccess,
	});

	const mutateLeaveComment = async (
		teamspaceId: number,
		feedId: number,
		content: string
	) => {
		await mutate(() => postComment(teamspaceId, feedId, content));
	};

	return { mutateLeaveComment };
};

export default useLeaveCommentMutation;
