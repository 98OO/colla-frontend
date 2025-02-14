import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import postSchedulingFeed from '@apis/post/postSchedulingFeed';
import { useMutation } from '@hooks/queries/common/useMutation';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';
import { PATH } from '@constants/path';
import type { SchedulingFeedForm } from '@type/feed';

const useSchedulingFeedMutation = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();
	const navigate = useNavigate();

	const handleSchedulingFeedSuccess = () => {
		makeToast('일정 조율 피드 작성 성공', 'Success');
		navigate(PATH.FEED);
	};

	const handleSchedulingFeedError = (error: Error) => {
		if (error instanceof HTTPError) {
			makeToast(
				'일정 조율 피드 작성을 실패했어요. 마감일시를 확인해 주세요',
				'Warning'
			);
		} else showBoundary(error);
	};

	const { mutate } = useMutation({
		onSuccess: handleSchedulingFeedSuccess,
		onError: handleSchedulingFeedError,
	});

	const mutateSchedulingFeed = async (
		form: SchedulingFeedForm,
		teamspaceId: number
	) => {
		await mutate(() => postSchedulingFeed(form, teamspaceId));
	};

	return { mutateSchedulingFeed };
};

export default useSchedulingFeedMutation;
