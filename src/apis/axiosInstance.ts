import axios from 'axios';
import { setAuthorizedRequest, handleTokenError, handleAPIError } from '@apis/axiosInterceptors';
import { BASE_URL, NETWORK_TIMEOUT } from '@constants/api';

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: NETWORK_TIMEOUT,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(setAuthorizedRequest);

axiosInstance.interceptors.response.use((response) => response, handleTokenError);

axiosInstance.interceptors.response.use((response) => response, handleAPIError);

export const refreshInstance = axios.create({
	baseURL: BASE_URL,
	timeout: NETWORK_TIMEOUT,
	withCredentials: true,
	skipAuthorizationHeader: true,
});

refreshInstance.interceptors.response.use((response) => response, handleAPIError);
