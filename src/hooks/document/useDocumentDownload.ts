interface UseDocumentDownloadParams {
	selectedDocument: Set<string>;
	downloadIntervalMs: number;
	onAfterDownload: () => void;
}

const useDocumentDownload = ({
	selectedDocument,
	downloadIntervalMs,
	onAfterDownload,
}: UseDocumentDownloadParams) => {
	const handleDownloadClick = () => {
		const selectedFileUrls = Array.from(selectedDocument);

		if (selectedFileUrls.length === 0) return;

		selectedFileUrls.forEach((fileUrl, index) => {
			window.setTimeout(() => {
				const link = document.createElement('a');

				link.href = fileUrl;
				link.download = '';

				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);

				if (index === selectedFileUrls.length - 1) onAfterDownload();
			}, index * downloadIntervalMs);
		});
	};

	return { handleDownloadClick };
};

export default useDocumentDownload;
