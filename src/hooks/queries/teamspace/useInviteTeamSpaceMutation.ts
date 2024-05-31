import { useErrorBoundary } from 'react-error-boundary';
import postInviteTeamSpace from '@apis/teamspace/postInviteTeamSpace';
import { useMutation } from '@hooks/queries/common/useMutation';
import useToastStore from '@stores/toastStore';
import { HTTPError } from '@apis/HTTPError';

const useInviteTeamSpace = () => {
	const { makeToast } = useToastStore();
	const { showBoundary } = useErrorBoundary();

	const handleInviteError = (error: Error) => {
		if (error instanceof HTTPError) {
			if (error.code === 30001) {
				makeToast('이메일을 입력해주세요.', 'Warning');
			}
		} else showBoundary(error);
	};

	const { mutate } = useMutation({
		onSuccess: () => makeToast('초대 메일을 전송하였습니다.', 'Success'),
		onError: handleInviteError,
	});

	const mutateInviteTeamSpace = async (teamspaceId: number, email: string) => {
		await mutate(() => postInviteTeamSpace(teamspaceId, email));
	};

	return { mutateInviteTeamSpace };
};
export default useInviteTeamSpace;
