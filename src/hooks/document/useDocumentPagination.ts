import { useMemo, useState } from 'react';
import {
	getDocumentPageNumbers,
	getLastPageNumber,
	getVisibleDocuments,
} from '@utils/document/documentPagination';
import type { Document } from '@type/document';

type PageDirection = 'prev' | 'next';

interface UseDocumentPaginationParams {
	attachments: Document[];
	itemsPerPage: number;
	pageGroupSize: number;
}

const useDocumentPagination = ({
	attachments,
	itemsPerPage,
	pageGroupSize,
}: UseDocumentPaginationParams) => {
	const [selectedNumber, setSelectedNumber] = useState(1);
	const lastPageNumber = getLastPageNumber(attachments.length, itemsPerPage);
	const visibleAttachments = useMemo(
		() => getVisibleDocuments(attachments, selectedNumber, itemsPerPage),
		[attachments, itemsPerPage, selectedNumber]
	);
	const pageNumbers = useMemo(
		() => getDocumentPageNumbers(selectedNumber, lastPageNumber, pageGroupSize),
		[lastPageNumber, pageGroupSize, selectedNumber]
	);

	const handleNumberClick = (number: number) => {
		if (number !== selectedNumber) setSelectedNumber(number);
	};

	const handlePageClick = (direction: PageDirection) => {
		setSelectedNumber((prev) => (direction === 'prev' ? prev - 1 : prev + 1));
	};

	const handlePageGroupClick = (direction: PageDirection) => {
		if (attachments.length === 0) return;

		setSelectedNumber((prev) =>
			direction === 'prev'
				? Math.max(
						(Math.floor((prev - 1) / pageGroupSize) - 1) * pageGroupSize + 1,
						1
					)
				: Math.min(
						Math.ceil(prev / pageGroupSize) * pageGroupSize + 1,
						lastPageNumber
					)
		);
	};

	return {
		selectedNumber,
		visibleAttachments,
		lastPageNumber,
		pageNumbers,
		handleNumberClick,
		handlePageClick,
		handlePageGroupClick,
	};
};

export default useDocumentPagination;
