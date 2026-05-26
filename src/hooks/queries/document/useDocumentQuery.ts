import getDocument from '@apis/document/getDocument';
import { useQuery } from '@tanstack/react-query';
import { storageResponse } from '@type/document';

const useDocumentQuery = (teamspaceId?: number) => {
	const { data: teamDocument, isPending } = useQuery<storageResponse>({
		queryKey: ['teamDocument', teamspaceId],
		queryFn: () => getDocument(teamspaceId!),

		enabled: !!teamspaceId,
		refetchOnMount: 'always',
		refetchOnWindowFocus: false,
	});

	return { teamDocument, isPending };
};

export default useDocumentQuery;
