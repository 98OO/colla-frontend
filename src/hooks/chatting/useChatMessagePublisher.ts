import { useCallback } from 'react';
import useFileUpload from '@hooks/common/useFileUpload';
import useSocketStore from '@stores/socketStore';
import { END_POINTS } from '@constants/api';
import type { Client } from '@stomp/stompjs';
import type { UserInformation } from '@type/user';

export interface AttachmentMessagePayload {
	type: 'IMAGE' | 'FILE';
	file: File;
}

interface UseChatMessagePublisherProps {
	selectedChat: number;
	userStatus: UserInformation | undefined;
}

const useChatMessagePublisher = (props: UseChatMessagePublisherProps) => {
	const { selectedChat, userStatus } = props;
	const { stompClient } = useSocketStore();
	const { isFileSizeExceedLimit, uploadFiles } = useFileUpload();

	const getConnectedStompClient = useCallback(() => {
		if (!stompClient?.connected) return null;

		return stompClient;
	}, [stompClient]);

	const publishTextMessage = useCallback(
		(connectedStompClient: Client, content: string) => {
			if (!userStatus) return false;

			try {
				connectedStompClient.publish({
					destination: END_POINTS.SEND_MESSAGE(
						userStatus.profile.lastSeenTeamspaceId,
						selectedChat
					),
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
		},
		[selectedChat, userStatus]
	);

	const publishAttachmentMessage = useCallback(
		async (connectedStompClient: Client, attachmentMessage: AttachmentMessagePayload) => {
			const { type, file } = attachmentMessage;

			if (!userStatus) return false;

			const fileUrl = await uploadFiles(
				[file],
				'TEAMSPACE',
				userStatus.profile.lastSeenTeamspaceId
			);
			const currentStompClient = getConnectedStompClient();

			if (!fileUrl || !currentStompClient || currentStompClient !== connectedStompClient)
				return false;

			try {
				currentStompClient.publish({
					destination: END_POINTS.SEND_MESSAGE(
						userStatus.profile.lastSeenTeamspaceId,
						selectedChat
					),
					body: JSON.stringify({
						chatType: type,
						content: null,
						images:
							type === 'IMAGE' ? [{ name: file.name, fileUrl: fileUrl[0], size: file.size }] : [],
						attachments:
							type === 'FILE' ? [{ name: file.name, fileUrl: fileUrl[0], size: file.size }] : [],
					}),
				});
			} catch {
				return false;
			}

			return true;
		},
		[getConnectedStompClient, selectedChat, uploadFiles, userStatus]
	);

	return {
		isFileSizeExceedLimit,
		getConnectedStompClient,
		publishTextMessage,
		publishAttachmentMessage,
	};
};

export default useChatMessagePublisher;
