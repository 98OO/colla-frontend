import type { Document } from '@type/document';

export type DocumentSortOrder = 'latest' | 'oldest';

export const getDocumentsBySortOrder = (
	documents: Document[],
	sortOrder: DocumentSortOrder
) => {
	if (sortOrder === 'latest') return [...documents].reverse();

	return [...documents];
};
