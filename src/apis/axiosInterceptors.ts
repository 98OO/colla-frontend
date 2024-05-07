import { getNewToken } from '@apis/user/getNewToken';
import { axiosInstance } from '@apis/axiosInstance';
import { HTTPError } from '@apis/HTTPError';
import {
	HTTP_STATUS_CODE,
	AUTH_ERROR_CODE,
	ACCESS_TOKEN,
} from '@constants/api';
import { PATH } from '@constants/path';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

export interface ErrorResponse {
	status: number;
	code?: number;
	content?: { [key: string]: string };
	message?: string;
}

export const setAuthorizedRequest = (config: InternalAxiosRequestConfig) => {
	if (!config.authRequired || !config.headers || config.headers.Authorization)
		return config;

	const accessToken = localStorage.getItem(ACCESS_TOKEN);

	if (!accessToken) {
		window.location.href = PATH.SIGNIN;
		throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
	}

	// eslint-disable-next-line no-param-reassign
	config.headers.Authorization = `Bearer ${accessToken}`;

	return config;
};

export const handleTokenError = async (error: AxiosError<ErrorResponse>) => {
	const originalRequest = error.config;

	if (!error.response || !originalRequest)
		throw new Error(
			'네트워크 요청이 실패하였거나, 요청 객체를 찾을 수 없습니다.'
		);
	const { data, status } = error.response;

	if (
		status === HTTP_STATUS_CODE.UNAUTHORIZED &&
		data.code === AUTH_ERROR_CODE.EXPIRED_TOKEN
	) {
		const { accessToken } = await getNewToken();
		originalRequest.headers.Authorization = `Bearer ${accessToken}`;
		localStorage.setItem(ACCESS_TOKEN, accessToken);

		return axiosInstance(originalRequest);
	}

	if (
		status === HTTP_STATUS_CODE.UNAUTHORIZED &&
		(data.code === AUTH_ERROR_CODE.INVALID_VERIFY_TOKEN ||
			data.code === AUTH_ERROR_CODE.UNAUTHORIZED_OR_EXPIRED_VERIFY_TOKEN ||
			data.code === AUTH_ERROR_CODE.FORBIDDEN_ACCESS_TOKEN ||
			data.code === AUTH_ERROR_CODE.EMPTY_ACCESS_TOKEN ||
			data.code === AUTH_ERROR_CODE.EXPIRED_TOKEN ||
			data.code === AUTH_ERROR_CODE.MALFORMED_TOKEN ||
			data.code === AUTH_ERROR_CODE.TAMPERED_TOKEN ||
			data.code === AUTH_ERROR_CODE.UNSUPPORTED_JWT_TOKEN ||
			data.code === AUTH_ERROR_CODE.TAKEN_AWAY_TOKEN)
	) {
		localStorage.removeItem(ACCESS_TOKEN);

		throw new HTTPError(status, data.code, data.content, data.message);
	}

	throw error;
};

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
	if (!error.response) throw error;

	const { data, status } = error.response;
	if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
		throw new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
	}

	throw new HTTPError(status, data.code, data.content, data.message);
};
