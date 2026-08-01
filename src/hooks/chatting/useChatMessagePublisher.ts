import { useCallback } from 'react';
import useFileUpload from '@hooks/common/useFileUpload';
import useSocketStore from '@stores/socketStore';
import { END_POINTS } from '@constants/api';
import type { Client } from '@stomp/stompjs';
import type { UploadedAttachment } from '@type/chat';
import type { UserInformation } from '@type/user';

export interface AttachmentMessagePayload {
	type: 'IMAGE' | 'FILE';
	file: File;
	uploadedAttachment?: UploadedAttachment;
}

export interface AttachmentPublishResult {
	isPublished: boolean;
	uploadedAttachment?: UploadedAttachment;
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
		async (
			connectedStompClient: Client,
			attachmentMessage: AttachmentMessagePayload
		): Promise<AttachmentPublishResult> => {
			const { type, file, uploadedAttachment: existingAttachment } = attachmentMessage;

			if (!userStatus) return { isPublished: false };

			let uploadedAttachment = existingAttachment;

			if (!uploadedAttachment) {
				try {
					const fileUrl = await uploadFiles(
						[file],
						'TEAMSPACE',
						userStatus.profile.lastSeenTeamspaceId
					);

					if (!fileUrl) return { isPublished: false };

					uploadedAttachment = { name: file.name, fileUrl: fileUrl[0], size: file.size };
				} catch {
					return { isPublished: false };
				}
			}

			const currentStompClient = getConnectedStompClient();

			if (!currentStompClient || currentStompClient !== connectedStompClient) {
				return { isPublished: false, uploadedAttachment };
			}

			try {
				currentStompClient.publish({
					destination: END_POINTS.SEND_MESSAGE(
						userStatus.profile.lastSeenTeamspaceId,
						selectedChat
					),
					body: JSON.stringify({
						chatType: type,
						content: null,
						images: type === 'IMAGE' ? [uploadedAttachment] : [],
						attachments: type === 'FILE' ? [uploadedAttachment] : [],
					}),
				});
			} catch {
				return { isPublished: false, uploadedAttachment };
			}

			return { isPublished: true, uploadedAttachment };
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
