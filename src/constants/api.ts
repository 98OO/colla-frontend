export const PROD = import.meta.env.NODE_ENV === 'production';

export const BASE_URL = PROD
	? `${window.location.protocol}//${import.meta.env.BASE_URL}`
	: 'http://localhost:3000';

export const NETWORK_TIMEOUT = 100000;

export const AUTH_API_URL = {
	KAKAO: `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}&response_type=code`,
	GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URL}&response_type=code&scope=email+profile`,
	NAVER: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&state=${import.meta.env.VITE_NAVER_STATE}&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT_URL}`,
};
