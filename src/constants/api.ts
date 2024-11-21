export const PROD = import.meta.env.VITE_NODE_ENV === 'production';

export const BASE_URL = PROD
	? `${window.location.protocol}//${import.meta.env.VITE_BASE_URL}`
	: 'http://localhost:3000';

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
	POST_NORMAL_FEED: (teamspaceId: number) =>
		`teamspaces/${teamspaceId}/feeds/normal`,
	POST_COLLECT_FEED: (teamspaceId: number) =>
		`teamspaces/${teamspaceId}/feeds/collect`,
	GET_COLLECT_SUB_TASK: (teamspaceId: number, feedId: number, userId: number) =>
		`teamspaces/${teamspaceId}/feeds/collect/${feedId}/responses/users/${userId}`,
	PATCH_COLLECT_SUB_TASK: (teamspaceId: number, feedId: number) =>
		`teamspaces/${teamspaceId}/feeds/collect/${feedId}/responses`,
	POST_SCHEDULING_FEED: (teamspaceId: number) =>
		`teamspaces/${teamspaceId}/feeds/scheduling`,
	POST_COMMENT: (teamspaceId: number, feedId: number) =>
		`teamspaces/${teamspaceId}/feeds/${feedId}/comments`,
	COMMENT: (teamspaceId: number, feedId: number, commentId: number) =>
		`teamspaces/${teamspaceId}/feeds/${feedId}/comments/${commentId}`,
	CHATS: (teamspaceId: number, chatChannelId: number) =>
		`teamspaces/${teamspaceId}/chat-channels/${chatChannelId}/messages`,
	SUBSCRIBE: (teamspaceId: number, selectedChat: number) =>
		`/topic/teamspaces/${teamspaceId}/chat-channels/${selectedChat}/messages`,
	READ_MESSAGE: (
		teamspaceId: number,
		selectedChat: number,
		messageId: number
	) =>
		`/app/teamspaces/${teamspaceId}/chat-channels/${selectedChat}/messages/${messageId}/read`,
	SEND_MESSAGE: (teamspaceId: number, selectedChat: number) =>
		`/app/teamspaces/${teamspaceId}/chat-channels/${selectedChat}/messages`,
	CHAT_CHANNEL_LIST: (teamspaceId: number, userId: number) =>
		`/topic/teamspaces/${teamspaceId}/users/${userId}/chat-channels/status`,
	RECEIVE_MESSAGE: (teamspaceId: number) =>
		`/topic/teamspaces/${teamspaceId}/receive-message`,
	SEND_CHAT_CHANNEL_LIST: (teamspaceId: number, userId: number) =>
		`/app/teamspaces/${teamspaceId}/users/${userId}/chat-channels/status`,
} as const;

export const AUTH_ERROR_CODE = {
	INVALID_VERIFY_TOKEN: 40101,
	INVALID_EMAIL_OR_PASSWORD: 40102,
	UNAUTHORIZED_OR_EXPIRED_VERIFY_TOKEN: 40103,
	DUPLICATED_USER_EMAIL: 40104,
	INVALID_OAUTH_PROVIDER: 40105,
	INVALID_AUTHORIZATION_CODE: 40106,
	SOCIAL_EMAIL_ALREADY_REGISTERED: 40107,
	FORBIDDEN_ACCESS_TOKEN: 40181,
	EMPTY_ACCESS_TOKEN: 40182,
	EXPIRED_ACCESS_TOKEN: 40183,
	MALFORMED_TOKEN: 40184,
	TAMPERED_TOKEN: 40185,
	UNSUPPORTED_JWT_TOKEN: 40186,
	TAKEN_AWAY_TOKEN: 40187,
	EXPIRED_REFRESH_TOKEN: 40188,
} as const;

export const HTTP_STATUS_CODE = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
} as const;

export const NETWORK_TIMEOUT = 100000;

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const INVITE_URL = 'INVITE_URL';

export const HTTP_ERROR_MESSAGE = {
	[HTTP_STATUS_CODE.NOT_FOUND]: {
		HEADING: '길을 잃으셨나요?',
		BODY: {
			firstLine: '페이지를 찾을 수 없습니다',
			secondLine: '존재하지 않는 주소를 입력하셨거나',
			thridLine: '요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다',
		},
		BUTTON: '홈으로 이동',
	},
	[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR]: {
		HEADING: '앗, 뭔가 문제가 생겼어요..',
		BODY: {
			firstLine: '서비스와 연결할 수 없습니다',
			secondLine: '문제를 해결하기 위해 열심히 노력하고 있습니다',
			thridLine: '잠시 후 다시 확인해주세요',
		},
		BUTTON: '홈으로 이동',
	},
	DEFAULT: {
		HEADING: '앗, 뭔가 문제가 생겼어요..',
		BODY: {
			firstLine: '일시적인 오류로 현재 요청사항을 처리하는데 실패했습니다',
			secondLine: '잠시 후 다시 한 번 시도해주세요',
			thridLine:
				'지속적으로 발생할 경우 새로 고침하거나 다른 페이지로 이동해주세요',
		},
		BUTTON: '다시 시도',
	},
};

export const AUTH_API_URL = {
	KAKAO: `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}&response_type=code`,
	GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URL}&response_type=code&scope=email+profile`,
	NAVER: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&state=${import.meta.env.VITE_NAVER_STATE}&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT_URL}`,
};

export const WEBSOCKET_URL = `${import.meta.env.VITE_SOCKET_URL}?accessToken=`;
