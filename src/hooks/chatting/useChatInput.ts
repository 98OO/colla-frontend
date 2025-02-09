import { ChangeEvent, useRef, useState, KeyboardEvent } from 'react';
import useFileUpload from '@hooks/common/useFileUpload';
import useSocketStore from '@stores/socketStore';
import useToastStore from '@stores/toastStore';
import { END_POINTS } from '@constants/api';
import type { UserInformation } from '@type/user';

export const useChatInput = (
	selectedChat: number,
	userStatus: UserInformation | undefined
) => {
	const [chatMessage, setChatMessage] = useState('');
	const inputImageRef = useRef<HTMLInputElement | null>(null);
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const messageEndRef = useRef<HTMLInputElement | null>(null);
	const { stompClient } = useSocketStore();
	const { makeToast } = useToastStore();
	const { isFileSizeExceedLimit, uploadFiles } = useFileUpload();

	const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		if (value.length <= 1000) setChatMessage(value);
	};

	const handleText = () => {
		if (userStatus) {
			stompClient?.send(
				END_POINTS.SEND_MESSAGE(
					userStatus.profile.lastSeenTeamspaceId,
					selectedChat
				),
				{},
				JSON.stringify({
					chatType: 'TEXT',
					content: chatMessage,
					images: [],
					attachments: [],
				})
			);
		}

		setChatMessage('');
	};

	const handleImageUploadClick = () => {
		inputImageRef.current?.click();
	};

	const handleFileUploadClick = () => {
		inputFileRef.current?.click();
	};

	const handleImageChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files && event.target.files[0]) {
			if (isFileSizeExceedLimit(event.target.files[0])) {
				makeToast('이미지 크기는 최대 100MB입니다.', 'Warning');
				return;
			}
			if (inputImageRef.current?.files) {
				const imageUrl = await uploadFiles(
					inputImageRef.current?.files,
					'TEAMSPACE',
					userStatus?.profile.lastSeenTeamspaceId
				);
				if (imageUrl && userStatus) {
					stompClient?.send(
						END_POINTS.SEND_MESSAGE(
							userStatus.profile.lastSeenTeamspaceId,
							selectedChat
						),
						{},
						JSON.stringify({
							chatType: 'IMAGE',
							content: null,
							images: [
								{
									name: inputImageRef.current?.files[0].name,
									fileUrl: imageUrl[0],
									size: inputImageRef.current?.files[0].size,
								},
							],
							attachments: [],
						})
					);
				}

				setTimeout(() => {
					messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
				}, 500);
			}
		}
	};

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			if (isFileSizeExceedLimit(event.target.files[0])) {
				makeToast('파일 크기는 최대 100MB입니다.', 'Warning');
				return;
			}

			if (inputFileRef.current?.files) {
				const fileUrl = await uploadFiles(
					inputFileRef.current?.files,
					'TEAMSPACE',
					userStatus?.profile.lastSeenTeamspaceId
				);
				if (fileUrl && userStatus) {
					stompClient?.send(
						END_POINTS.SEND_MESSAGE(
							userStatus.profile.lastSeenTeamspaceId,
							selectedChat
						),
						{},
						JSON.stringify({
							chatType: 'FILE',
							content: null,
							images: [],
							attachments: [
								{
									name: inputFileRef.current?.files[0].name,
									fileUrl: fileUrl[0],
									size: inputFileRef.current?.files[0].size,
								},
							],
						})
					);
				}

				setTimeout(() => {
					messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
				}, 500);
			}
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.nativeEvent.isComposing) return;

		if (event.key === 'Enter' && event.shiftKey) {
			event.preventDefault();
			setChatMessage((prev) => `${prev}\n`);
		} else if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();

			if (chatMessage.trim().length > 0) handleText();
		}
	};

	return {
		chatMessage,
		inputImageRef,
		inputFileRef,
		messageEndRef,
		handleMessageChange,
		handleText,
		handleImageUploadClick,
		handleFileUploadClick,
		handleImageChange,
		handleFileChange,
		handleKeyDown,
	};
};
