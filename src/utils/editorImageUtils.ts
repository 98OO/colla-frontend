import { REGEX } from '@constants/feed';

const replaceDataUrlsToAttachmentUrls = (
	content: string,
	attachmentUrls: string[]
) => {
	let imgIndex = 0;

	return content.replace(REGEX.DATA_URL, (match) => {
		const replacementUrl = attachmentUrls[imgIndex];
		imgIndex += 1;

		if (replacementUrl) {
			return match.replace(REGEX.IMG_SRC, `src="${replacementUrl}"`);
		}

		return match;
	});
};

const convertToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
		reader.readAsDataURL(file);
	});
};

export { replaceDataUrlsToAttachmentUrls, convertToBase64 };
