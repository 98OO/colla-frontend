import { useErrorBoundary } from 'react-error-boundary';
import postSchedulingAvail from '@apis/post/postSchedulingAvail';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@hooks/queries/common/useMutation';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';

const useSchedulingAvailMutation = (teamspaceId: number | undefined) => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();
	const queryClient = useQueryClient();

	const handleSchedulingAvailSuccess = () => {
		makeToast('일정을 반영했어요!', 'Success');
		queryClient.invalidateQueries({ queryKey: ['feeds', teamspaceId] });
	};

	const handleSchedulingAvailError = (error: Error) => {
		if (error instanceof HTTPError) {
			makeToast('일정 추가 및 변경에 실패했어요. 다시 시도해주세요', 'Warning');
		} else showBoundary(error);
	};

	const { mutate } = useMutation({
		onSuccess: handleSchedulingAvailSuccess,
		onError: handleSchedulingAvailError,
	});

	const mutateSchedulingAvail = async (
		teamspaceId: number,
		feedId: number,
		availabilities: Record<string, number[]>
	) => {
		await mutate(() =>
			postSchedulingAvail(teamspaceId, feedId, availabilities)
		);
	};

	return { mutateSchedulingAvail };
};

export default useSchedulingAvailMutation;
