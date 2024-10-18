import getChatMessage from '@apis/chat/getChatMessage';
import { useInfiniteQuery } from '@tanstack/react-query';

const useChatMessageQuery = (
	chatChannelId: number,
	teamspaceId: number | undefined
) => {
	const {
		data: messages,
		hasNextPage,
		isFetching,
		fetchNextPage,
	} = useInfiniteQuery({
		queryKey: ['chatMessage', chatChannelId, teamspaceId],
		queryFn: ({ pageParam }) =>
			getChatMessage({ teamspaceId, chatChannelId, before: pageParam }),
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => {
			const lastChat = lastPage.chatChannelMessages;
			if (lastChat.length === 0) return undefined;
			const lastMessage = lastChat[lastChat.length - 1];
			return lastMessage.id;
		},

		gcTime: 24 * 60 * 60 * 1000,
		staleTime: 24 * 60 * 60 * 1000,
		enabled: !!teamspaceId,
	});

	return {
		messages,
		fetchNextPage,
		hasNextPage,
		isFetching,
	};
};

export default useChatMessageQuery;
