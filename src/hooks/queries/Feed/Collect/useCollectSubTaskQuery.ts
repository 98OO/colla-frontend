import getCollectSubTask from '@apis/Feed/Collect/getCollectSubTask';
import { useQuery } from '@tanstack/react-query';
import type { SubTaskResponse } from '@type/feed';

const useCollectSubTaskQuery = (
	teamspaceId: number | undefined,
	feedId: number,
	userId: number
) => {
	const { data: subTask } = useQuery<SubTaskResponse>({
		queryKey: ['subTask', feedId, userId],
		queryFn: () => getCollectSubTask(teamspaceId!, feedId, userId),

		gcTime: 24 * 60 * 60 * 1000,
		staleTime: 24 * 60 * 60 * 1000,
		enabled: !!teamspaceId,
	});

	return { subTask };
};

export default useCollectSubTaskQuery;
