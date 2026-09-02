export const PROD = import.meta.env.VITE_NODE_ENV === 'production';

export const BASE_URL = PROD
	? `${window.location.protocol}//${import.meta.env.VITE_BASE_URL}`
	: 'http://localhost:3000';

export const NETWORK_TIMEOUT = 10000;

// FILE_SIZE_LIMIT(100MB)를 최소 ~1MB/s로 올려도 끊기지 않도록 여유를 둔 값
export const FILE_UPLOAD_TIMEOUT = 120000;

export const AUTH_API_URL = {
	KAKAO: `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}&response_type=code`,
	GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URL}&response_type=code&scope=email+profile`,
	NAVER: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&state=${import.meta.env.VITE_NAVER_STATE}&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT_URL}`,
};

export const IMAGE_TRANSFORM_BASE_URL = import.meta.env.VITE_IMAGE_TRANSFORM_BASE_URL;
export const IMAGE_SOURCE_HOSTNAME = import.meta.env.VITE_IMAGE_SOURCE_HOSTNAME;

export const WEBSOCKET_URL = `${import.meta.env.VITE_SOCKET_URL}?accessToken=`;

export const WEBSOCKET_RECONNECT_INITIAL_DELAY = 1_000;
export const WEBSOCKET_RECONNECT_MAX_DELAY = 4_000;
export const WEBSOCKET_CONNECTION_TIMEOUT = 5_000;
export const WEBSOCKET_RECONNECT_TIMEOUT = 15_000;
