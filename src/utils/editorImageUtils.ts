const replaceEditorImageUrls = (content: string, imageUrls: string[], previewUrls: string[]) => {
	return previewUrls.reduce((updatedContent, previewUrl, index) => {
		const imageUrl = imageUrls[index];
		if (!imageUrl) return updatedContent;

		return updatedContent.replaceAll(`src="${previewUrl}"`, () => `src="${imageUrl}"`);
	}, content);
};

export default replaceEditorImageUrls;
