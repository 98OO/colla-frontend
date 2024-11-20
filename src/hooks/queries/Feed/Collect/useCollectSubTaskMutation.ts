import { useErrorBoundary } from 'react-error-boundary';
import patchCollectSubTask from '@apis/Feed/Collect/patchCollectSubTask';
import { useMutation } from '@hooks/queries/common/useMutation';
import { useQueryClient } from '@tanstack/react-query';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';
import type { CollectSubTaskParams } from '@apis/Feed/Collect/patchCollectSubTask';

const useCollectSubTaskMutation = (
	teamspaceId: number | undefined,
	feedId: number
) => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();
	const queryClient = useQueryClient();

	const handleCollectSubTaskSuccess = () => {
		makeToast('하위 업무 작성 성공', 'Success');
		queryClient.invalidateQueries({ queryKey: ['feeds', teamspaceId] });
		queryClient.invalidateQueries({ queryKey: ['subTask', feedId] });
	};

	const handleCollectSubTaskError = (error: Error) => {
		if (error instanceof HTTPError) {
			makeToast('하위 업무 작성을 실패했습니다. 다시 시도해주세요', 'Warning');
		} else showBoundary(error);
	};

	const { mutate } = useMutation({
		onSuccess: handleCollectSubTaskSuccess,
		onError: handleCollectSubTaskError,
	});

	const mutateCollectSubTask = async (task: CollectSubTaskParams) => {
		await mutate(() => patchCollectSubTask(task));
	};

	return { mutateCollectSubTask };
};

export default useCollectSubTaskMutation;
