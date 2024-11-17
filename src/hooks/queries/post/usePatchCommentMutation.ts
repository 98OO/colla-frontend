import patchComment from '@apis/Feed/patchComment';
import { useMutation } from '@hooks/queries/common/useMutation';
import { useQueryClient } from '@tanstack/react-query';

const usePatchCommentMutation = () => {
	const queryClient = useQueryClient();

	const handlePatchCommentSuccess = () => {
		queryClient.invalidateQueries({ queryKey: ['feeds'] });
	};

	const { mutate } = useMutation({
		onSuccess: handlePatchCommentSuccess,
	});

	const mutatePatchComment = async (
		teamspaceId: number,
		feedId: number,
		commentId: number,
		content: string
	) => {
		await mutate(() => patchComment(teamspaceId, feedId, commentId, content));
	};

	return { mutatePatchComment };
};

export default usePatchCommentMutation;
