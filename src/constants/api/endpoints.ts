export const END_POINTS = {
	SIGNIN: 'auth/login',
	NEWTOKEN: 'auth/refresh',
	OAUTHSIGNIN: `auth/oauth`,
	AUTHMAILSEND: 'auth/mail/send',
	AUTHDUPLICATION: 'auth/mail/duplication',
	AUTHMAILVERIFICATION: 'auth/mail/verification',
	AUTHREGISTER: 'auth/register',
	USERSTATUS: 'users/status',
	USERLASTSEEN: 'users/last-seen',
	TEAMSPACE: 'teamspaces',
	PRESIGNED: 'presigned',
	USERSETTING: 'users/settings',
	FEEDS: (teamspaceId: number) => `teamspaces/${teamspaceId}/feeds`,
	POST_NORMAL_FEED: (teamspaceId: number) => `teamspaces/${teamspaceId}/feeds/normal`,
	POST_COLLECT_FEED: (teamspaceId: number) => `teamspaces/${teamspaceId}/feeds/collect`,
	GET_COLLECT_SUB_TASK: (teamspaceId: number, feedId: number, userId: number) =>
		`teamspaces/${teamspaceId}/feeds/collect/${feedId}/responses/users/${userId}`,
	PATCH_COLLECT_SUB_TASK: (teamspaceId: number, feedId: number) =>
		`teamspaces/${teamspaceId}/feeds/collect/${feedId}/responses`,
	POST_SCHEDULING_FEED: (teamspaceId: number) => `teamspaces/${teamspaceId}/feeds/scheduling`,
	SCHEDULING_AVAIL: (teamspaceId: number, feedId: number) =>
		`teamspaces/${teamspaceId}/feeds/scheduling/${feedId}/availabilities`,
	POST_COMMENT: (teamspaceId: number, feedId: number) =>
		`teamspaces/${teamspaceId}/feeds/${feedId}/comments`,
	COMMENT: (teamspaceId: number, feedId: number, commentId: number) =>
		`teamspaces/${teamspaceId}/feeds/${feedId}/comments/${commentId}`,
	CHATS: (teamspaceId: number, chatChannelId: number) =>
		`teamspaces/${teamspaceId}/chat-channels/${chatChannelId}/messages`,
	SUBSCRIBE: (teamspaceId: number, selectedChat: number) =>
		`/topic/teamspaces/${teamspaceId}/chat-channels/${selectedChat}/messages`,
	READ_MESSAGE: (teamspaceId: number, selectedChat: number, messageId: number) =>
		`/app/teamspaces/${teamspaceId}/chat-channels/${selectedChat}/messages/${messageId}/read`,
	SEND_MESSAGE: (teamspaceId: number, selectedChat: number) =>
		`/app/teamspaces/${teamspaceId}/chat-channels/${selectedChat}/messages`,
	CHAT_CHANNEL_LIST: (teamspaceId: number, userId: number) =>
		`/topic/teamspaces/${teamspaceId}/users/${userId}/chat-channels/status`,
	RECEIVE_MESSAGE: (teamspaceId: number) => `/topic/teamspaces/${teamspaceId}/receive-message`,
	SEND_CHAT_CHANNEL_LIST: (teamspaceId: number, userId: number) =>
		`/app/teamspaces/${teamspaceId}/users/${userId}/chat-channels/status`,
	GET_UNREAD_MESSAGE_COUNT: (teamspaceId: number) => `/teamspaces/${teamspaceId}/unread-count`,
	POST_TEAMSPACE_ROLE: (teamspaceId: number) => `teamspaces/${teamspaceId}/tags`,
} as const;
