import axios from 'axios';
import useAuthStore from '@stores/authStore';
import {
	getPendingRefreshPromise,
	invalidateSession,
	isCurrentSession,
	refreshAccessToken,
} from '@apis/authSession';
import { axiosInstance } from '@apis/axiosInstance';
import { HTTPError } from '@apis/HTTPError';
import { NetworkError } from '@apis/NetworkError';
import { SESSION_INVALID_CODES, TOKEN_ERROR_CODE } from '@constants/api';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

export interface ErrorResponse {
	status: number;
	code?: number;
	content?: { [key: string]: string };
	message?: string;
}

export const setAuthorizedRequest = async (config: InternalAxiosRequestConfig) => {
	if (config.skipAuthorizationHeader) return config;

	// eslint-disable-next-line no-param-reassign
	config.sessionVersion ??= useAuthStore.getState().sessionVersion;

	if (config.headers.Authorization) return config;

	const pendingRefresh = getPendingRefreshPromise();
	const newAccessToken = pendingRefresh ? await pendingRefresh.catch(() => null) : null;
	const accessToken = newAccessToken ?? useAuthStore.getState().accessToken;

	if (!accessToken) throw new Error('인증 정보가 없어 요청을 중단합니다');

	// eslint-disable-next-line no-param-reassign
	config.headers.Authorization = `Bearer ${accessToken}`;

	return config;
};

const isExpiredAccessTokenError = (code: number | undefined) =>
	code === TOKEN_ERROR_CODE.EXPIRED_ACCESS_TOKEN;

const retryWithNewToken = async (request: InternalAxiosRequestConfig) => {
	request.isRetried = true;

	const accessToken = await refreshAccessToken();
	request.headers.Authorization = `Bearer ${accessToken}`;

	return axiosInstance(request);
};

export const handleTokenError = async (error: AxiosError<ErrorResponse>) => {
	if (axios.isCancel(error)) throw error;

	const originalRequest = error.config;

	if (!error.response) {
		if (error.isAxiosError) throw new NetworkError();
		throw error;
	}

	if (!originalRequest) throw error;

	const { skipAuthorizationHeader, sessionVersion, isRetried } = originalRequest;
	if (skipAuthorizationHeader || sessionVersion === undefined) throw error;

	const { data, status } = error.response;

	if (isExpiredAccessTokenError(data.code) && !isRetried) {
		if (!isCurrentSession(sessionVersion)) throw new axios.CanceledError();

		return retryWithNewToken(originalRequest);
	}

	if (data.code !== undefined && SESSION_INVALID_CODES.has(data.code)) {
		invalidateSession(data.code, sessionVersion);

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
