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
		Array.from(selectedDocument).forEach((fileUrl, index) => {
			window.setTimeout(() => {
				const link = document.createElement('a');

				link.href = fileUrl;
				link.download = '';

				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}, index * downloadIntervalMs);
		});

		onAfterDownload();
	};

	return { handleDownloadClick };
};

export default useDocumentDownload;
