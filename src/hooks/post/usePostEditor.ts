import { useRef, useState } from 'react';
import useFileUpload from '@hooks/common/useFileUpload';
import useCollectFeedMutation from '@hooks/queries/post/useCollectFeedMutation';
import useNormalFeedMutation from '@hooks/queries/post/useNormalFeedMutation';
import { useLastSeenTeamspaceId } from '@hooks/user/useLastSeenTeamspaceId';
import { replaceDataUrlsToAttachmentUrls } from '@utils/editorImageUtils';
import type { Editor } from '@tiptap/react';

interface FileDTO {
	name: string;
	fileUrl: string;
	size: number;
}

interface EditorImageUrlResult {
	content: string;
	imageUrls: string[];
}

type FeedSubmitCommand =
	| {
			feedType: 'NORMAL';
			title: string;
	  }
	| {
			feedType: 'COLLECT';
			title: string;
			dueAt: string | null;
	  };

const createFileDTOs = (files: File[], fileUrls: string[]): FileDTO[] => {
	return files.map((file, index) => ({
		name: file.name,
		fileUrl: fileUrls[index],
		size: file.size,
	}));
};

const usePostEditor = () => {
	const teamspaceId = useLastSeenTeamspaceId();

	const { uploadFiles } = useFileUpload();
	const { mutateNormalFeed } = useNormalFeedMutation();
	const { mutateCollectFeed } = useCollectFeedMutation();

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
		setAttachmentFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
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

	const resolveEditorImageUrls = async (): Promise<EditorImageUrlResult | null> => {
		if (!teamspaceId) return null;

		const content = editorRef.current?.getHTML();
		if (!content) return null;

		const imageUrls = await uploadFiles(imageFiles, 'TEAMSPACE', teamspaceId);
		if (!imageUrls) return null;

		return {
			content: replaceDataUrlsToAttachmentUrls(content, imageUrls),
			imageUrls,
		};
	};

	const submitFeed = async (command: FeedSubmitCommand) => {
		if (!teamspaceId) return;

		const result = await resolveEditorImageUrls();
		if (!result) return;
		const { content, imageUrls } = result;

		const attachmentUrls = await uploadFiles(attachmentFiles, 'TEAMSPACE', teamspaceId);
		if (!attachmentUrls) return;

		const commonPayload = {
			teamspaceId,
			title: command.title,
			images: createFileDTOs(imageFiles, imageUrls),
			attachments: createFileDTOs(attachmentFiles, attachmentUrls),
		};

		if (command.feedType === 'NORMAL') {
			await mutateNormalFeed({
				...commonPayload,
				details: { content },
			});

			return;
		}

		await mutateCollectFeed({
			...commonPayload,
			details: { content, dueAt: command.dueAt },
		});
	};

	const submitNormalFeed = (title: string) => {
		return submitFeed({ feedType: 'NORMAL', title });
	};

	const submitCollectFeed = (title: string, dueAt: string | null) => {
		return submitFeed({ feedType: 'COLLECT', title, dueAt });
	};

	return {
		editorRef,
		attachmentFiles,
		appendImageFile,
		appendAttachmentFile,
		deleteAttachmentFile,
		handleDragOver,
		handleDrop,
		resolveEditorImageUrls,
		submitNormalFeed,
		submitCollectFeed,
	};
};

export default usePostEditor;
