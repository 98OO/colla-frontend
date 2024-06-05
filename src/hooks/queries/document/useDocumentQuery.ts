import getDocument from '@apis/document/getDocument';
import { useQuery } from '@tanstack/react-query';
import { storageResponse } from '@type/document';

const useDocumentQuery = (teamspaceId?: number) => {
	const { data: teamDocument } = useQuery<storageResponse>({
		queryKey: ['teamDocument'],
		queryFn: () => getDocument(teamspaceId!),
		gcTime: 60 * 60 * 60 * 1000,
		staleTime: 60 * 60 * 60 * 1000,
		enabled: !!teamspaceId,
	});

	return { teamDocument };
};

export default useDocumentQuery;
