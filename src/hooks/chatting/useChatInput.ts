import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import useFileUpload from '@hooks/common/useFileUpload';
import useSocketStore from '@stores/socketStore';
import useToastStore from '@stores/toastStore';
import { END_POINTS } from '@constants/api';
import type { FailedChatMessage } from '@type/chat';
import type { UserInformation } from '@type/user';

interface useChatInputProps {
	selectedChat: number;
	userStatus: UserInformation | undefined;
	messageEndRef: React.RefObject<HTMLDivElement>;
}

interface AttachmentMessagePayload {
	type: 'IMAGE' | 'FILE';
	file: File;
}

const useChatInput = (props: useChatInputProps) => {
	const { selectedChat, userStatus, messageEndRef } = props;
	const [chatMessage, setChatMessage] = useState('');
	const [failedMessages, setFailedMessages] = useState<FailedChatMessage[]>([]);
	const failedMessagesRef = useRef<FailedChatMessage[]>([]);
	const shouldScrollToFailedMessageRef = useRef(false);
	const inputImageRef = useRef<HTMLInputElement | null>(null);
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const { stompClient, connectionStatus, reconnectNow } = useSocketStore();
	const { makeToast } = useToastStore();
	const { isFileSizeExceedLimit, uploadFiles } = useFileUpload();

	useEffect(() => {
		failedMessagesRef.current = failedMessages;

		if (!shouldScrollToFailedMessageRef.current) return;

		shouldScrollToFailedMessageRef.current = false;
		messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [failedMessages, messageEndRef]);

	useEffect(() => {
		return () => {
			failedMessagesRef.current.forEach((message) => {
				if (message.type !== 'TEXT') URL.revokeObjectURL(message.localUrl);
			});
		};
	}, []);

	const getConnectedStompClient = () => {
		if (connectionStatus !== 'connected' || !stompClient?.connected) return null;

		return stompClient;
	};

	const removeFailedMessage = (messageId: string) => {
		setFailedMessages((prev) => {
			const failedMessage = prev.find((message) => message.id === messageId);

			if (failedMessage && failedMessage.type !== 'TEXT') {
				URL.revokeObjectURL(failedMessage.localUrl);
			}

			return prev.filter((message) => message.id !== messageId);
		});
	};

	const addFailedTextMessage = (content: string) => {
		shouldScrollToFailedMessageRef.current = true;
		setFailedMessages((prev) => [
			{
				id: `${Date.now()}-${Math.random()}`,
				type: 'TEXT',
				content,
			},
			...prev,
		]);
	};

	const addFailedAttachmentMessage = (type: 'IMAGE' | 'FILE', file: File) => {
		shouldScrollToFailedMessageRef.current = true;
		setFailedMessages((prev) => [
			{
				id: `${Date.now()}-${Math.random()}`,
				type,
				file,
				localUrl: URL.createObjectURL(file),
			},
			...prev,
		]);
	};

	const publishTextMessage = (
		connectedStompClient: NonNullable<typeof stompClient>,
		content: string
	) => {
		if (!userStatus) return false;

		try {
			connectedStompClient.publish({
				destination: END_POINTS.SEND_MESSAGE(userStatus.profile.lastSeenTeamspaceId, selectedChat),
				body: JSON.stringify({
					chatType: 'TEXT',
					content,
					images: [],
					attachments: [],
				}),
			});
		} catch {
			return false;
		}

		return true;
	};

	const publishAttachmentMessage = async (
		connectedStompClient: NonNullable<typeof stompClient>,
		attachmentMessage: AttachmentMessagePayload
	) => {
		const { type, file } = attachmentMessage;

		if (!userStatus) return false;

		const fileUrl = await uploadFiles([file], 'TEAMSPACE', userStatus.profile.lastSeenTeamspaceId);
		const currentStompClient = getConnectedStompClient();

		if (!fileUrl || !currentStompClient || currentStompClient !== connectedStompClient)
			return false;

		try {
			currentStompClient.publish({
				destination: END_POINTS.SEND_MESSAGE(userStatus.profile.lastSeenTeamspaceId, selectedChat),
				body: JSON.stringify({
					chatType: type,
					content: null,
					images:
						type === 'IMAGE'
							? [
									{
										name: file.name,
										fileUrl: fileUrl[0],
										size: file.size,
									},
								]
							: [],
					attachments:
						type === 'FILE'
							? [
									{
										name: file.name,
										fileUrl: fileUrl[0],
										size: file.size,
									},
								]
							: [],
				}),
			});
		} catch {
			return false;
		}

		return true;
	};

	const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = event.target;

		if (value.length <= 1000) setChatMessage(value);
	};

	const handleText = () => {
		const connectedStompClient = getConnectedStompClient();
		const content = chatMessage;

		if (!connectedStompClient || !publishTextMessage(connectedStompClient, content)) {
			addFailedTextMessage(content);
		}

		setChatMessage('');
	};

	const handleFailedMessageRetry = async (failedMessage: FailedChatMessage) => {
		const connectedStompClient = getConnectedStompClient();

		if (!connectedStompClient) {
			reconnectNow();
			return;
		}

		const isPublished =
			failedMessage.type === 'TEXT'
				? publishTextMessage(connectedStompClient, failedMessage.content)
				: await publishAttachmentMessage(connectedStompClient, {
						type: failedMessage.type,
						file: failedMessage.file,
					});

		if (isPublished) removeFailedMessage(failedMessage.id);
	};

	const handleImageUploadClick = () => {
		inputImageRef.current?.click();
	};

	const handleFileUploadClick = () => {
		inputFileRef.current?.click();
	};

	const handleAttachmentChange = async (
		event: ChangeEvent<HTMLInputElement>,
		type: 'IMAGE' | 'FILE'
	) => {
		const input = event.target;
		const file = input.files?.[0];
		input.value = '';

		if (!file) return;

		if (isFileSizeExceedLimit(file)) {
			makeToast(
				type === 'IMAGE' ? '이미지 크기는 최대 100MB입니다.' : '파일 크기는 최대 100MB입니다.',
				'Warning'
			);
			return;
		}

		const connectedStompClient = getConnectedStompClient();

		if (!connectedStompClient) {
			addFailedAttachmentMessage(type, file);
			return;
		}

		const isPublished = await publishAttachmentMessage(connectedStompClient, { type, file });

		if (!isPublished) {
			addFailedAttachmentMessage(type, file);
			return;
		}

		setTimeout(() => {
			messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
		}, 500);
	};

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) =>
		handleAttachmentChange(event, 'IMAGE');

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) =>
		handleAttachmentChange(event, 'FILE');

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
		failedMessages,
		inputImageRef,
		inputFileRef,
		messageEndRef,
		handleMessageChange,
		handleText,
		handleFailedMessageRetry,
		handleFailedMessageDelete: removeFailedMessage,
		handleImageUploadClick,
		handleFileUploadClick,
		handleImageChange,
		handleFileChange,
		handleKeyDown,
	};
};

export default useChatInput;
