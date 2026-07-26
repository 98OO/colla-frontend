import { invalidateSession, isCurrentSession } from '@apis/auth/sessionActions';
import { refreshAccessToken, resolveAccessTokenForRequest } from '@apis/auth/tokenRefreshManager';
import axios from 'axios';
import useAuthStore from '@stores/authStore';
import { HTTPError } from '@apis/HTTPError';
import { NetworkError } from '@apis/NetworkError';
import { SESSION_INVALID_CODES, TOKEN_ERROR_CODE } from '@constants/api';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

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

	const { sessionVersion } = config;

	const accessToken = await resolveAccessTokenForRequest(sessionVersion);

	// eslint-disable-next-line no-param-reassign
	config.headers.Authorization = `Bearer ${accessToken}`;

	return config;
};

const isExpiredAccessTokenError = (code: number | undefined) =>
	code === TOKEN_ERROR_CODE.EXPIRED_ACCESS_TOKEN;

const retryWithNewToken = async (instance: AxiosInstance, request: InternalAxiosRequestConfig) => {
	request.isRetried = true;

	const result = await refreshAccessToken();
	if (result.type !== 'success') throw new axios.CanceledError();

	request.headers.Authorization = `Bearer ${result.accessToken}`;

	return instance(request);
};

const handleTokenError = async (error: AxiosError<ErrorResponse>, instance: AxiosInstance) => {
	if (axios.isCancel(error)) throw error;

	const originalRequest = error.config;

	if (!error.response) {
		if (error.isAxiosError) throw new NetworkError();
		throw error;
	}

	if (!originalRequest) throw error;

	const { skipAuthorizationHeader, sessionVersion, isRetried } = originalRequest;
	if (skipAuthorizationHeader || sessionVersion === undefined) throw error;

	const { data } = error.response;

	if (isExpiredAccessTokenError(data.code) && !isRetried) {
		if (!isCurrentSession(sessionVersion)) throw new axios.CanceledError();

		return retryWithNewToken(instance, originalRequest);
	}

	if (data.code !== undefined && SESSION_INVALID_CODES.has(data.code)) {
		invalidateSession(data.code, sessionVersion);
		throw new axios.CanceledError();
	}

	throw error;
};

export const createTokenErrorHandler =
	(instance: AxiosInstance) => (error: AxiosError<ErrorResponse>) =>
		handleTokenError(error, instance);

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
