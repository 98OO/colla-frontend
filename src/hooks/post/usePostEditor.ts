import { useEffect, useRef, useState } from 'react';
import useFileUpload from '@hooks/common/useFileUpload';
import useCollectFeedMutation from '@hooks/queries/post/useCollectFeedMutation';
import useNormalFeedMutation from '@hooks/queries/post/useNormalFeedMutation';
import { useLastSeenTeamspaceId } from '@hooks/user/useLastSeenTeamspaceId';
import replaceEditorImageUrls from '@utils/editorImageUtils';
import optimizeImageFile from '@utils/optimizeImageFile';
import type { Editor } from '@tiptap/react';

interface FileDTO {
	name: string;
	fileUrl: string;
	size: number;
}

interface EditorImageUrlResult {
	content: string;
	imageFiles: File[];
	imageUrls: string[];
}

interface EditorImage {
	file: File;
	previewUrl: string;
}

interface UploadedEditorImages {
	imageFiles: File[];
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

const getReferencedEditorImages = (editorImages: EditorImage[], content: string) => {
	return editorImages.filter(({ previewUrl }) => content.includes(previewUrl));
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

	const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const editorRef = useRef<Editor>(null);
	const editorImagesRef = useRef<EditorImage[]>([]);
	const isSubmittingRef = useRef(false);

	useEffect(() => {
		const editorImages = editorImagesRef.current;

		return () => {
			editorImages.forEach(({ previewUrl }) => URL.revokeObjectURL(previewUrl));
		};
	}, []);

	const appendImageFile = (file: File) => {
		const previewUrl = URL.createObjectURL(file);
		editorImagesRef.current.push({ file, previewUrl });

		return previewUrl;
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

	const uploadEditorImages = async (
		editorImages: EditorImage[],
		currentTeamspaceId: number
	): Promise<UploadedEditorImages | null> => {
		const imageFilePromises = editorImages.map(({ file }) => optimizeImageFile(file));
		const imageFiles = await Promise.all(imageFilePromises);
		const imageUrls: string[] | null = await uploadFiles(
			imageFiles,
			'TEAMSPACE',
			currentTeamspaceId
		);

		if (!imageUrls || imageUrls.length !== imageFiles.length) return null;

		return { imageFiles, imageUrls };
	};

	const resolveEditorImageUrls = async (): Promise<EditorImageUrlResult | null> => {
		if (!teamspaceId) return null;

		const content = editorRef.current?.getHTML();
		if (!content) return null;

		const editorImages = getReferencedEditorImages(editorImagesRef.current, content);
		const uploadedImages = await uploadEditorImages(editorImages, teamspaceId);
		if (!uploadedImages) return null;

		const { imageFiles, imageUrls } = uploadedImages;
		const previewUrls = editorImages.map(({ previewUrl }) => previewUrl);

		return {
			content: replaceEditorImageUrls(content, imageUrls, previewUrls),
			imageFiles,
			imageUrls,
		};
	};

	const submitFeed = async (command: FeedSubmitCommand) => {
		if (!teamspaceId || isSubmittingRef.current) return;

		isSubmittingRef.current = true;
		setIsSubmitting(true);

		try {
			const result = await resolveEditorImageUrls();
			if (!result) return;
			const { content, imageFiles, imageUrls } = result;

			const attachmentUrls: string[] | null = await uploadFiles(
				attachmentFiles,
				'TEAMSPACE',
				teamspaceId
			);
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
		} finally {
			isSubmittingRef.current = false;
			setIsSubmitting(false);
		}
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
		isSubmitting,
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
