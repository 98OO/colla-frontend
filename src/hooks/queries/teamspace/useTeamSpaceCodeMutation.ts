import postTeamSpaceCode from '@apis/teamspace/postTeamSpaceCode';
import { useMutation } from '@hooks/queries/common/useMutation';
import useToastStore from '@stores/toastStore';

const useTeamSpaceCode = () => {
	const { makeToast } = useToastStore();

	const handleCodeSucess = (inviteCode: string) => {
		makeToast('초대 코드를 복사하였습니다.', 'Success');
		navigator.clipboard.writeText(inviteCode);
	};

	const { mutate } = useMutation({
		onSuccess: (inviteCode: string) => handleCodeSucess(inviteCode),
	});

	const mutateTeampSpaceCode = async (teamspaceId: number) => {
		await mutate(() => postTeamSpaceCode(teamspaceId));
	};

	return { mutateTeampSpaceCode };
};
export default useTeamSpaceCode;
