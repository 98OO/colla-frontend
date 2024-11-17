import deleteComment from '@apis/Feed/deleteComment';
import { useMutation } from '@hooks/queries/common/useMutation';
import { useQueryClient } from '@tanstack/react-query';

const useDeleteCommentMutation = () => {
	const queryClient = useQueryClient();

	const handleDeleteCommentSuccess = () => {
		queryClient.invalidateQueries({ queryKey: ['feeds'] });
	};

	const { mutate } = useMutation({
		onSuccess: handleDeleteCommentSuccess,
	});

	const mutateDeleteComment = async (
		teamspaceId: number,
		feedId: number,
		commentId: number
	) => {
		await mutate(() => deleteComment(teamspaceId, feedId, commentId));
	};

	return { mutateDeleteComment };
};

export default useDeleteCommentMutation;
