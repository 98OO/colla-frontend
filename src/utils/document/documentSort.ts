import type { Document } from '@type/document';

export const getLatestDocuments = (documents: Document[]) => {
	return [...documents].reverse();
};
