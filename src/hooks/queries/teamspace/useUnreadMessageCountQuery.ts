import getUnreadMessageCount from '@apis/teamspace/getUnreadMessageCount';
import { useQuery } from '@tanstack/react-query';
import type { UnreadMessageCountResponse } from '@type/team';

const useUnreadMessageCountQuery = (teamspaceId?: number) => {
	const { data } = useQuery<UnreadMessageCountResponse>({
		queryKey: ['unreadMessage'],
		queryFn: () => getUnreadMessageCount(teamspaceId!),
		gcTime: 60 * 60 * 60 * 1000,
		staleTime: 60 * 60 * 60 * 1000,
		enabled: !!teamspaceId,
	});

	return { unreadMessageCount: data?.unreadMessageCount };
};

export default useUnreadMessageCountQuery;
