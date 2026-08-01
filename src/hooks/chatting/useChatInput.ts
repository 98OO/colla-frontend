import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import useChatMessagePublisher from '@hooks/chatting/useChatMessagePublisher';
import useChatMessageQueue from '@hooks/chatting/useChatMessageQueue';
import useSocketStore from '@stores/socketStore';
import useToastStore from '@stores/toastStore';
import type { UserInformation } from '@type/user';

interface UseChatInputProps {
	selectedChat: number;
	userStatus: UserInformation | undefined;
	messageEndRef: React.RefObject<HTMLDivElement>;
}

const useChatInput = (props: UseChatInputProps) => {
	const { selectedChat, userStatus, messageEndRef } = props;
	const [chatMessage, setChatMessage] = useState('');
	const inputImageRef = useRef<HTMLInputElement | null>(null);
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const { connectionStatus, reconnectNow } = useSocketStore();
	const { makeToast } = useToastStore();
	const {
		isFileSizeExceedLimit,
		getConnectedStompClient,
		publishTextMessage,
		publishAttachmentMessage,
	} = useChatMessagePublisher({ selectedChat, userStatus });
	const {
		queuedMessages,
		failedMessages,
		addQueuedTextMessage,
		addQueuedAttachmentMessage,
		addFailedTextMessage,
		addFailedAttachmentMessage,
		handleFailedMessageRetry,
		handleFailedMessageDelete,
	} = useChatMessageQueue({
		connectionStatus,
		messageEndRef,
		reconnectNow,
		getConnectedStompClient,
		publishTextMessage,
		publishAttachmentMessage,
	});
	const isRecovering = connectionStatus === 'connecting' || connectionStatus === 'reconnectWaiting';

	const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = event.target;

		if (value.length <= 1000) setChatMessage(value);
	};

	const handleText = () => {
		const content = chatMessage;
		const connectedStompClient = getConnectedStompClient();

		if (connectedStompClient) {
			if (!publishTextMessage(connectedStompClient, content)) addFailedTextMessage(content);
		} else if (isRecovering) addQueuedTextMessage(content);
		else addFailedTextMessage(content);

		setChatMessage('');
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
			if (isRecovering) addQueuedAttachmentMessage(type, file);
			else addFailedAttachmentMessage(type, file);
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
		queuedMessages,
		failedMessages,
		inputImageRef,
		inputFileRef,
		handleMessageChange,
		handleText,
		handleFailedMessageRetry,
		handleFailedMessageDelete,
		handleImageUploadClick,
		handleFileUploadClick,
		handleImageChange,
		handleFileChange,
		handleKeyDown,
	};
};

export default useChatInput;
