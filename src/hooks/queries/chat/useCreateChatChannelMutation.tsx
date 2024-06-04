import postCreateChatChannel from '@apis/chat/postCreateChatChannel';
import { useMutation } from '@hooks/queries/common/useMutation';
import { useQueryClient } from '@tanstack/react-query';
import useToastStore from '@stores/toastStore';

const useCreateChatChannelMutation = () => {
	const { makeToast } = useToastStore();
	const queryClient = useQueryClient();

	const handleCreateChatChannelSucess = () => {
		makeToast('채팅방 생성이 완료됬습니다.', 'Success');
		queryClient.invalidateQueries({ queryKey: ['chatChannel'] });
	};

	const { mutate } = useMutation({
		onSuccess: handleCreateChatChannelSucess,
	});

	const mutateCreateChatChannel = async (
		teamspaceId: number,
		ChatChannelName: string
	) => {
		await mutate(() => postCreateChatChannel(teamspaceId, ChatChannelName));
	};

	return { mutateCreateChatChannel };
};
export default useCreateChatChannelMutation;
