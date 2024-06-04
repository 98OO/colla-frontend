import getChatChannel from '@apis/chat/getChatChannel';
import { useQuery } from '@tanstack/react-query';
import type { ChatChannels } from '@type/chat';

const useChatChannelQuery = (teamspaceId?: number) => {
	const { data: chatChannel } = useQuery<ChatChannels>({
		queryKey: ['chatChannel'],
		queryFn: () => getChatChannel(teamspaceId!),
		gcTime: 60 * 60 * 60 * 1000,
		staleTime: 60 * 60 * 60 * 1000,
		enabled: !!teamspaceId,
	});

	return { chatChannel };
};

export default useChatChannelQuery;
