interface OpenImagePreviewWindowParams {
	src: string;
	alt: string;
}

export const openImagePreviewWindow = ({ src, alt }: OpenImagePreviewWindowParams) => {
	const imageWindow = window.open('', '_blank');

	if (!imageWindow) return false;

	imageWindow.opener = null;
	imageWindow.document.title = alt;
	imageWindow.document.body.style.margin = '0';
	imageWindow.document.body.style.backgroundColor = '#0f1115';
	imageWindow.document.body.style.display = 'flex';
	imageWindow.document.body.style.alignItems = 'center';
	imageWindow.document.body.style.justifyContent = 'center';
	imageWindow.document.body.style.minHeight = '100vh';

	const previewImage = imageWindow.document.createElement('img');

	previewImage.src = src;
	previewImage.alt = alt;
	previewImage.style.maxWidth = '100vw';
	previewImage.style.maxHeight = '100vh';
	previewImage.style.objectFit = 'contain';

	imageWindow.document.body.replaceChildren(previewImage);

	return true;
};
