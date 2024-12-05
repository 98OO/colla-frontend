import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import postCollectFeed from '@apis/post/postCollectFeed';
import { useMutation } from '@hooks/queries/common/useMutation';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';
import { PATH } from '@constants/path';
import type { CollectFeedForm } from '@type/feed';

const useCollectFeedMutation = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();
	const navigate = useNavigate();

	const handleCollectFeedSuccess = () => {
		makeToast('자료 수집 피드 작성 성공', 'Success');
		navigate(PATH.FEED);
	};

	const handleCollectFeedError = (error: Error) => {
		if (error instanceof HTTPError) {
			makeToast(
				'자료 수집 피드 작성을 실패했습니다. 다시 시도해주세요',
				'Warning'
			);
		} else showBoundary(error);
	};

	const { mutate } = useMutation({
		onSuccess: handleCollectFeedSuccess,
		onError: handleCollectFeedError,
	});

	const mutateCollectFeed = async (form: CollectFeedForm) => {
		await mutate(() => postCollectFeed(form));
	};

	return { mutateCollectFeed };
};

export default useCollectFeedMutation;
