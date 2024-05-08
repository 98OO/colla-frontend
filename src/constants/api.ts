export const PROD = import.meta.env.VITE_NODE_ENV === 'production';

export const BASE_URL = PROD
	? `${window.location.protocol}//${import.meta.env.VITE_BASE_URL}`
	: 'http://localhost:3000';

export const END_POINTS = {
	SIGNIN: 'auth/login',
	NEWTOKEN: 'auth/refresh',
	OAUTHSIGNIN: `auth/oauth`,
	AUTHMAILSEND: 'auth/mail/send',
	AUTHMAILVERIFICATION: 'auth/mail/verification',
	AUTHREGISTER: 'auth/register',
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
	EXPIRED_TOKEN: 40183,
	MALFORMED_TOKEN: 40184,
	TAMPERED_TOKEN: 40185,
	UNSUPPORTED_JWT_TOKEN: 40186,
	TAKEN_AWAY_TOKEN: 40187,
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

export const AUTH_API_URL = {
	KAKAO: `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}&response_type=code`,
	GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URL}&response_type=code&scope=email+profile`,
	NAVER: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&state=${import.meta.env.VITE_NAVER_STATE}&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT_URL}`,
};
