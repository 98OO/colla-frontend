import { getNewToken } from '@apis/user/getNewToken';
import { queryClient } from '@hooks/queries/common/queryClient';
import axios from 'axios';
import { axiosInstance } from '@apis/axiosInstance';
import { HTTPError } from '@apis/HTTPError';
import { NetworkError } from '@apis/NetworkError';
import {
	ABNORMAL_TOKEN_CODES,
	ACCESS_TOKEN,
	SESSION_INVALID_CODES,
	TOKEN_ERROR_CODE,
} from '@constants/api';
import { PATH } from '@constants/path';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

export interface ErrorResponse {
	status: number;
	code?: number;
	content?: { [key: string]: string };
	message?: string;
}

let newAccessTokenPromise: Promise<string> | null = null;

const invalidateSession = (code: number) => {
	if (ABNORMAL_TOKEN_CODES.has(code)) {
		// eslint-disable-next-line no-console
		console.warn(`비정상적인 토큰 오류가 발생했습니다 (code: ${code})`);
	}

	localStorage.removeItem(ACCESS_TOKEN);
	queryClient.removeQueries({ queryKey: ['userStatus'] });
};

const requestNewAccessToken = () => {
	if (!newAccessTokenPromise) {
		newAccessTokenPromise = getNewToken()
			.then(({ accessToken }) => {
				localStorage.setItem(ACCESS_TOKEN, accessToken);
				return accessToken;
			})
			.catch((error) => {
				if (
					error instanceof HTTPError &&
					error.code !== undefined &&
					SESSION_INVALID_CODES.has(error.code)
				) {
					invalidateSession(error.code);
				}

				throw error;
			})
			.finally(() => {
				newAccessTokenPromise = null;
			});
	}

	return newAccessTokenPromise;
};

export const setAuthorizedRequest = async (config: InternalAxiosRequestConfig) => {
	if (config.skipAuthorizationHeader || config.headers.Authorization) return config;

	const newAccessToken = newAccessTokenPromise
		? await newAccessTokenPromise.catch(() => null)
		: null;
	const accessToken = newAccessToken ?? localStorage.getItem(ACCESS_TOKEN);

	if (!accessToken) {
		window.location.href = PATH.ROOT;
		throw new Error('인증 정보가 없어 요청을 중단합니다');
	}

	// eslint-disable-next-line no-param-reassign
	config.headers.Authorization = `Bearer ${accessToken}`;

	return config;
};

export const handleTokenError = async (error: AxiosError<ErrorResponse>) => {
	if (axios.isCancel(error)) throw error;

	const originalRequest = error.config;

	if (!error.response) {
		if (error.isAxiosError) throw new NetworkError();
		throw error;
	}

	if (!originalRequest) throw error;

	const { data, status } = error.response;

	if (
		data.code === TOKEN_ERROR_CODE.EXPIRED_ACCESS_TOKEN &&
		!originalRequest.skipAuthorizationHeader &&
		!originalRequest.isRetried
	) {
		originalRequest.isRetried = true;

		const accessToken = await requestNewAccessToken();
		originalRequest.headers.Authorization = `Bearer ${accessToken}`;

		return axiosInstance(originalRequest);
	}

	if (data.code !== undefined && SESSION_INVALID_CODES.has(data.code)) {
		invalidateSession(data.code);

		throw new HTTPError(status, data.code, data.content, data.message);
	}

	throw error;
};

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
	if (axios.isCancel(error)) throw error;

	if (error instanceof HTTPError || error instanceof NetworkError) throw error;

	if (!error.response) {
		if (error.isAxiosError) throw new NetworkError();
		throw error;
	}

	const { data, status } = error.response;

	throw new HTTPError(status, data?.code, data?.content, data?.message);
};
