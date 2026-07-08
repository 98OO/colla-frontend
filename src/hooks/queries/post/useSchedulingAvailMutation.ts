import { useErrorBoundary } from 'react-error-boundary';
import putSchedulingAvailability from '@apis/Feed/Scheduling/putSchedulingAvailability';
import { useMutation } from '@hooks/queries/common/useMutation';
import { useQueryClient } from '@tanstack/react-query';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';
import type { UserAvailability } from '@type/feed';

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

	const mutateSchedulingAvail = async (feedId: number, availabilities: UserAvailability) => {
		if (!teamspaceId) return;

		await mutate(() => putSchedulingAvailability(teamspaceId, feedId, availabilities));
	};

	return { mutateSchedulingAvail };
};

export default useSchedulingAvailMutation;
