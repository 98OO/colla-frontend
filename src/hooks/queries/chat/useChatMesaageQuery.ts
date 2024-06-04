import getChatMessage from '@apis/chat/getChatMessage';
import { useQuery } from '@tanstack/react-query';
import { ChatData } from '@type/chat';

const useChatMessageQuery = (
	chatChanneld: number,
	teamspaceId?: number,
	before?: number
) => {
	const { data: chatMessage, refetch } = useQuery<ChatData>({
		queryKey: ['chatMessage', chatChanneld, teamspaceId, before],
		queryFn: () => getChatMessage(teamspaceId!, chatChanneld, before),
		gcTime: 60 * 60 * 60 * 1000,
		staleTime: 60 * 60 * 60 * 1000,
		enabled: !!teamspaceId,
	});

	return { chatMessage, refetch };
};

export default useChatMessageQuery;
