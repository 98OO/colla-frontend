import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import postSchedulingFeed from '@apis/post/postSchedulingFeed';
import { useLastSeenTeamspaceId } from '@hooks/user/useLastSeenTeamspaceId';
import { useMutation } from '@tanstack/react-query';
import { calcTimeSegment } from '@utils/post/scheduling/timeOptionUtils';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';
import { NetworkError } from '@apis/NetworkError';
import { COMMON_ERROR_MESSAGE, VALIDATION_ERROR_CODE } from '@constants/api';
import { PATH } from '@constants/path';
import type { SchedulingPostFormData, SchedulingPostRequest } from '@type/post';

const SCHEDULING_POST_MESSAGE = {
	SUCCESS: '일정 조율 피드를 작성했어요',
	INVALID: '입력한 내용이 올바르지 않아요. 다시 확인해 주세요',
	FAILED: '일정 조율 피드 작성에 실패했어요. 잠시 후 다시 시도해 주세요',
} as const;

interface SchedulingPostVariables {
	request: SchedulingPostRequest;
	teamspaceId: number;
}

const useSchedulingPostMutation = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();

	const navigate = useNavigate();
	const teamspaceId = useLastSeenTeamspaceId();

	const { mutate, isPending } = useMutation({
		mutationFn: ({ request, teamspaceId: id }: SchedulingPostVariables) =>
			postSchedulingFeed(request, id),
		onSuccess: () => {
			makeToast(SCHEDULING_POST_MESSAGE.SUCCESS, 'Success');
			navigate(PATH.FEED);
		},
		onError: (error: Error) => {
			if (error instanceof HTTPError) {
				switch (error.code) {
					case VALIDATION_ERROR_CODE:
						makeToast(SCHEDULING_POST_MESSAGE.INVALID, 'Warning');
						break;
					default:
						makeToast(SCHEDULING_POST_MESSAGE.FAILED, 'Warning');
				}
			} else if (error instanceof NetworkError) {
				makeToast(COMMON_ERROR_MESSAGE.NETWORK, 'Warning');
			} else showBoundary(error);
		},
	});

	const mutateSchedulingPost = (formData: SchedulingPostFormData) => {
		if (teamspaceId === undefined) {
			makeToast(COMMON_ERROR_MESSAGE.TEAMSPACE_NOT_FOUND, 'Warning');
			return;
		}

		const request: SchedulingPostRequest = {
			title: formData.title,
			details: {
				dueAt: `${formData.dueAtDate} ${formData.dueAtTime}`,
				minTimeSegment: calcTimeSegment(formData.timeRange.from),
				maxTimeSegment: calcTimeSegment(formData.timeRange.to),
				targetDates: Array.from(formData.targetDates).sort(),
			},
		};

		mutate({ request, teamspaceId });
	};

	return { mutateSchedulingPost, isPending };
};

export default useSchedulingPostMutation;
