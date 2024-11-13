import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import postNormalFeed from '@apis/post/postNormalFeed';
import { useMutation } from '@hooks/queries/common/useMutation';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';
import { PATH } from '@constants/path';
import type { NormalFeedForm } from '@type/feed';

const useNormalFeedMutation = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();
	const navigate = useNavigate();

	const handleNormalFeedSuccess = () => {
		makeToast('일반 피드 작성 성공', 'Success');
		navigate(PATH.FEED);
	};

	const handleNormalFeedError = (error: Error) => {
		if (error instanceof HTTPError) {
			makeToast('일반 피드 작성을 실패했습니다. 다시 시도해주세요', 'Warning');
		} else showBoundary(error);
	};

	const { mutate } = useMutation({
		onSuccess: handleNormalFeedSuccess,
		onError: handleNormalFeedError,
	});

	const mutateNormalFeed = async (form: NormalFeedForm) => {
		await mutate(() => postNormalFeed(form));
	};

	return { mutateNormalFeed };
};

export default useNormalFeedMutation;
