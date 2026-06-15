import { useState } from 'react';
import type { Document } from '@type/document';

interface UseDocumentSelectionParams {
	visibleAttachments: Document[];
}

const useDocumentSelection = ({
	visibleAttachments,
}: UseDocumentSelectionParams) => {
	const [selectedDocument, setSelectedDocument] = useState<Set<string>>(
		new Set()
	);
	const selectedVisibleCount = visibleAttachments.filter((attachment) =>
		selectedDocument.has(attachment.fileUrl)
	).length;
	const isAllVisibleSelected =
		visibleAttachments.length > 0 &&
		selectedVisibleCount === visibleAttachments.length;

	const handleDocumentClick = (fileUrl: string) => {
		setSelectedDocument((prevSelected) => {
			const nextSelected = new Set(prevSelected);

			if (nextSelected.has(fileUrl)) nextSelected.delete(fileUrl);
			else nextSelected.add(fileUrl);

			return nextSelected;
		});
	};

	const handleSelectAllClick = () => {
		setSelectedDocument((prevSelected) => {
			const nextSelected = new Set(prevSelected);

			if (isAllVisibleSelected) {
				visibleAttachments.forEach((attachment) =>
					nextSelected.delete(attachment.fileUrl)
				);
			} else {
				visibleAttachments.forEach((attachment) =>
					nextSelected.add(attachment.fileUrl)
				);
			}

			return nextSelected;
		});
	};

	const clearSelectedDocument = () => {
		setSelectedDocument(new Set());
	};

	return {
		selectedDocument,
		isAllVisibleSelected,
		handleDocumentClick,
		handleSelectAllClick,
		clearSelectedDocument,
	};
};

export default useDocumentSelection;
