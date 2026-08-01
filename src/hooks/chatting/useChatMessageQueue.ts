import { useCallback, useEffect, useRef, useState } from 'react';
import type { SocketConnectionStatus } from '@stores/socketStore';
import type { AttachmentMessagePayload } from '@hooks/chatting/useChatMessagePublisher';
import type { Client } from '@stomp/stompjs';
import type { LocalChatMessage } from '@type/chat';

interface UseChatMessageQueueProps {
	connectionStatus: SocketConnectionStatus;
	messageEndRef: React.RefObject<HTMLDivElement>;
	reconnectNow: () => void;
	getConnectedStompClient: () => Client | null;
	publishTextMessage: (connectedStompClient: Client, content: string) => boolean;
	publishAttachmentMessage: (
		connectedStompClient: Client,
		attachmentMessage: AttachmentMessagePayload
	) => Promise<boolean>;
}

const createLocalMessageId = () => `${Date.now()}-${Math.random()}`;

const releaseLocalUrl = (message: LocalChatMessage) => {
	if (message.type !== 'TEXT') URL.revokeObjectURL(message.localUrl);
};

const useChatMessageQueue = (props: UseChatMessageQueueProps) => {
	const {
		connectionStatus,
		messageEndRef,
		reconnectNow,
		getConnectedStompClient,
		publishTextMessage,
		publishAttachmentMessage,
	} = props;
	const [queuedMessages, setQueuedMessages] = useState<LocalChatMessage[]>([]);
	const [failedMessages, setFailedMessages] = useState<LocalChatMessage[]>([]);
	const queuedMessagesRef = useRef<LocalChatMessage[]>([]);
	const failedMessagesRef = useRef<LocalChatMessage[]>([]);
	const shouldScrollToLocalMessageRef = useRef(false);
	const isFlushingQueueRef = useRef(false);
	const isUnmountedRef = useRef(false);

	const updateQueuedMessages = useCallback((messages: LocalChatMessage[]) => {
		queuedMessagesRef.current = messages;
		setQueuedMessages(messages);
	}, []);

	const updateFailedMessages = useCallback((messages: LocalChatMessage[]) => {
		failedMessagesRef.current = messages;
		setFailedMessages(messages);
	}, []);

	const removeQueuedMessage = useCallback(
		(messageId: string) => {
			const queuedMessage = queuedMessagesRef.current.find((message) => message.id === messageId);

			if (queuedMessage) releaseLocalUrl(queuedMessage);

			updateQueuedMessages(queuedMessagesRef.current.filter((message) => message.id !== messageId));
		},
		[updateQueuedMessages]
	);

	const removeFailedMessage = useCallback(
		(messageId: string) => {
			const failedMessage = failedMessagesRef.current.find((message) => message.id === messageId);

			if (failedMessage) releaseLocalUrl(failedMessage);

			updateFailedMessages(failedMessagesRef.current.filter((message) => message.id !== messageId));
		},
		[updateFailedMessages]
	);

	const addFailedTextMessage = useCallback(
		(content: string) => {
			shouldScrollToLocalMessageRef.current = true;
			updateFailedMessages([
				{ id: createLocalMessageId(), type: 'TEXT', content },
				...failedMessagesRef.current,
			]);
		},
		[updateFailedMessages]
	);

	const addFailedAttachmentMessage = useCallback(
		(type: 'IMAGE' | 'FILE', file: File) => {
			shouldScrollToLocalMessageRef.current = true;
			updateFailedMessages([
				{
					id: createLocalMessageId(),
					type,
					file,
					localUrl: URL.createObjectURL(file),
				},
				...failedMessagesRef.current,
			]);
		},
		[updateFailedMessages]
	);

	const addQueuedTextMessage = useCallback(
		(content: string) => {
			shouldScrollToLocalMessageRef.current = true;
			updateQueuedMessages([
				{ id: createLocalMessageId(), type: 'TEXT', content },
				...queuedMessagesRef.current,
			]);
		},
		[updateQueuedMessages]
	);

	const addQueuedAttachmentMessage = useCallback(
		(type: 'IMAGE' | 'FILE', file: File) => {
			shouldScrollToLocalMessageRef.current = true;
			updateQueuedMessages([
				{
					id: createLocalMessageId(),
					type,
					file,
					localUrl: URL.createObjectURL(file),
				},
				...queuedMessagesRef.current,
			]);
		},
		[updateQueuedMessages]
	);

	const moveQueuedMessageToFailed = useCallback(
		(messageId: string) => {
			const queuedMessage = queuedMessagesRef.current.find((message) => message.id === messageId);

			if (!queuedMessage) return;

			updateQueuedMessages(queuedMessagesRef.current.filter((message) => message.id !== messageId));
			updateFailedMessages([queuedMessage, ...failedMessagesRef.current]);
		},
		[updateFailedMessages, updateQueuedMessages]
	);

	const moveQueuedMessagesToFailed = useCallback(() => {
		const queued = queuedMessagesRef.current;

		if (queued.length === 0) return;

		updateQueuedMessages([]);
		updateFailedMessages([...queued, ...failedMessagesRef.current]);
	}, [updateFailedMessages, updateQueuedMessages]);

	const moveFailedMessageToQueue = useCallback(
		(messageId: string) => {
			const failedMessage = failedMessagesRef.current.find((message) => message.id === messageId);

			if (!failedMessage) return;

			updateFailedMessages(failedMessagesRef.current.filter((message) => message.id !== messageId));
			updateQueuedMessages([failedMessage, ...queuedMessagesRef.current]);
		},
		[updateFailedMessages, updateQueuedMessages]
	);

	useEffect(() => {
		if (!shouldScrollToLocalMessageRef.current) return;

		shouldScrollToLocalMessageRef.current = false;
		messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [failedMessages, messageEndRef, queuedMessages]);

	useEffect(() => {
		if (connectionStatus === 'disconnected') moveQueuedMessagesToFailed();
	}, [connectionStatus, moveQueuedMessagesToFailed]);

	useEffect(() => {
		isUnmountedRef.current = false;

		return () => {
			isUnmountedRef.current = true;
			[...failedMessagesRef.current, ...queuedMessagesRef.current].forEach(releaseLocalUrl);
		};
	}, []);

	useEffect(() => {
		const shouldFlush =
			connectionStatus === 'connected' && queuedMessages.length > 0 && !isFlushingQueueRef.current;

		if (!shouldFlush) return;

		const flushQueuedMessage = async () => {
			if (isUnmountedRef.current) {
				isFlushingQueueRef.current = false;
				return;
			}

			const queuedMessage = queuedMessagesRef.current.at(-1);
			const connectedStompClient = getConnectedStompClient();

			if (!queuedMessage || !connectedStompClient) {
				isFlushingQueueRef.current = false;
				return;
			}

			const isPublished =
				queuedMessage.type === 'TEXT'
					? publishTextMessage(connectedStompClient, queuedMessage.content)
					: await publishAttachmentMessage(connectedStompClient, {
							type: queuedMessage.type,
							file: queuedMessage.file,
						});

			isFlushingQueueRef.current = false;

			if (isUnmountedRef.current) return;

			if (isPublished) removeQueuedMessage(queuedMessage.id);
			else if (getConnectedStompClient()) moveQueuedMessageToFailed(queuedMessage.id);
		};

		isFlushingQueueRef.current = true;
		setTimeout(() => {
			flushQueuedMessage().catch(() => {
				const queuedMessage = queuedMessagesRef.current.at(-1);

				isFlushingQueueRef.current = false;

				if (queuedMessage && getConnectedStompClient()) {
					moveQueuedMessageToFailed(queuedMessage.id);
				}
			});
		}, 0);
	}, [
		connectionStatus,
		getConnectedStompClient,
		moveQueuedMessageToFailed,
		publishAttachmentMessage,
		publishTextMessage,
		queuedMessages.length,
		removeQueuedMessage,
	]);

	const handleFailedMessageRetry = useCallback(
		async (failedMessage: LocalChatMessage) => {
			const connectedStompClient = getConnectedStompClient();

			if (!connectedStompClient) {
				moveFailedMessageToQueue(failedMessage.id);
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
		},
		[
			getConnectedStompClient,
			moveFailedMessageToQueue,
			publishAttachmentMessage,
			publishTextMessage,
			reconnectNow,
			removeFailedMessage,
		]
	);

	return {
		queuedMessages,
		failedMessages,
		addQueuedTextMessage,
		addQueuedAttachmentMessage,
		addFailedTextMessage,
		addFailedAttachmentMessage,
		handleFailedMessageRetry,
		handleFailedMessageDelete: removeFailedMessage,
	};
};

export default useChatMessageQueue;
