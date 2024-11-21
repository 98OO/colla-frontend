import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import postSchedulingAvail from '@apis/post/postSchedulingAvail';
import { useMutation } from '@hooks/queries/common/useMutation';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';
import { PATH } from '@constants/path';

const useSchedulingAvailMutation = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();
	const navigate = useNavigate();

	const handleSchedulingAvailSuccess = () => {
		makeToast('일정 추가/수정 성공', 'Success');
		navigate(PATH.FEED);
	};

	const handleSchedulingAvailError = (error: Error) => {
		if (error instanceof HTTPError) {
			makeToast('일정 추가/수정에 실패했습니다. 다시 시도해주세요', 'Warning');
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
