import { useRef, useState } from 'react';
import useFileUpload from '@hooks/common/useFileUpload';
import useNormalFeedMutation from '@hooks/queries/post/useNormalFeedMutation';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { replaceDataUrlsToAttachmentUrls } from '@utils/editorImageUtils';
import type { Editor } from '@tiptap/react';

interface FileDTO {
	name: string;
	fileUrl: string;
	size: number;
}

const usePostEditor = () => {
	const { userStatus } = useUserStatusQuery();
	const { uploadFiles } = useFileUpload();
	const { mutateNormalFeed } = useNormalFeedMutation();

	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
	const editorRef = useRef<Editor>(null);

	const appendImageFile = (file: File) => {
		setImageFiles((prevFiles) => [...prevFiles, file]);
	};

	const appendAttachmentFile = (file: File) => {
		setAttachmentFiles((prevFiles) => [...prevFiles, file]);
	};

	const deleteAttachmentFile = (fileName: string) => {
		setAttachmentFiles((prevFiles) =>
			prevFiles.filter((file) => file.name !== fileName)
		);
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();

		const files = Array.from(event.dataTransfer.files);

		if (!files.length) return;

		files.forEach((file) => appendAttachmentFile(file));
	};

	const getFileList = (files: File[]) => {
		const dataTransfer = new DataTransfer();
		files.forEach((file) => dataTransfer.items.add(file));

		return dataTransfer.files;
	};

	const getAttachmentUrls = async (files: File[], teamspaceId: number) => {
		const fileList = getFileList(files);

		const attachmentUrls = await uploadFiles(
			fileList,
			'TEAMSPACE',
			teamspaceId
		);

		return attachmentUrls;
	};

	const getFileDTOs = (files: File[], attachmentUrls: string[]): FileDTO[] => {
		return files.map((file, index) => ({
			name: file.name,
			fileUrl: attachmentUrls[index],
			size: file.size,
		}));
	};

	const handleSubmit = async (title: string) => {
		if (!editorRef.current) return;

		const teamspaceId = userStatus?.profile.lastSeenTeamspaceId;

		if (!teamspaceId) return;

		const content = editorRef.current.getHTML();
		const imageUrls = await getAttachmentUrls(imageFiles, teamspaceId);
		const attachmentUrls = await getAttachmentUrls(
			attachmentFiles,
			teamspaceId
		);

		if (!content || !imageUrls || !attachmentUrls) return;

		const replacedContent = replaceDataUrlsToAttachmentUrls(content, imageUrls);

		const images = getFileDTOs(imageFiles, imageUrls);
		const attachments = getFileDTOs(attachmentFiles, attachmentUrls);

		mutateNormalFeed({
			teamspaceId,
			title,
			images,
			attachments,
			details: { content: replacedContent },
		});
	};

	return {
		editorRef,
		attachmentFiles,
		appendImageFile,
		appendAttachmentFile,
		deleteAttachmentFile,
		handleDragOver,
		handleDrop,
		handleSubmit,
	};
};

export default usePostEditor;
