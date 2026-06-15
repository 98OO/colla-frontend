import type { Document } from '@type/document';

export const getLastPageNumber = (
	documentCount: number,
	itemsPerPage: number
) => {
	return Math.max(Math.ceil(documentCount / itemsPerPage), 1);
};

export const getVisibleDocuments = (
	documents: Document[],
	selectedPage: number,
	itemsPerPage: number
) => {
	return documents.slice(
		(selectedPage - 1) * itemsPerPage,
		selectedPage * itemsPerPage
	);
};

export const getDocumentPageNumbers = (
	selectedPage: number,
	lastPage: number,
	pageGroupSize: number
) => {
	const startPage =
		Math.floor((selectedPage - 1) / pageGroupSize) * pageGroupSize + 1;
	const endPage = Math.min(startPage + pageGroupSize - 1, lastPage);

	return Array.from(
		{ length: Math.max(endPage - startPage + 1, 0) },
		(_, index) => {
			return startPage + index;
		}
	);
};
