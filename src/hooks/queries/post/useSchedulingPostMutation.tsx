import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import postSchedulingFeed from '@apis/post/postSchedulingFeed';
import { useMutation } from '@hooks/queries/common/useMutation';
import { useLastSeenTeamspaceId } from '@hooks/user/useLastSeenTeamspaceId';
import { calcTimeSegment } from '@utils/post/scheduling/timeOptionUtils';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';
import { PATH } from '@constants/path';
import type { SchedulingPostFormData, SchedulingPostRequest } from '@type/post';

const useSchedulingPostMutation = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();
	const navigate = useNavigate();
	const teamspaceId = useLastSeenTeamspaceId();

	const handleSchedulingFeedSuccess = () => {
		makeToast('일정 조율 피드 작성 성공', 'Success');
		navigate(PATH.FEED);
	};

	const handleSchedulingFeedError = (error: Error) => {
		if (error instanceof HTTPError) {
			makeToast('일정 조율 피드 작성을 실패했어요. 마감일시를 확인해 주세요', 'Warning');
		} else showBoundary(error);
	};

	const { mutate } = useMutation({
		onSuccess: handleSchedulingFeedSuccess,
		onError: handleSchedulingFeedError,
	});

	const mutateSchedulingPost = async (formData: SchedulingPostFormData) => {
		if (teamspaceId === undefined) {
			makeToast('팀스페이스 정보를 찾을 수 없어요. 다시 시도해 주세요', 'Warning');
			return;
		}

		const convertedFormData: SchedulingPostRequest = {
			title: formData.title,
			details: {
				dueAt: `${formData.dueAtDate} ${formData.dueAtTime}`,
				minTimeSegment: calcTimeSegment(formData.timeRange.from),
				maxTimeSegment: calcTimeSegment(formData.timeRange.to),
				targetDates: Array.from(formData.targetDates).sort(),
			},
		};

		await mutate(() => postSchedulingFeed(convertedFormData, teamspaceId));
	};

	return { mutateSchedulingPost };
};

export default useSchedulingPostMutation;
