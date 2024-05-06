import axios from 'axios';

import { BASE_URL, NETWORK_TIMEOUT } from '@constants/api';

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: NETWORK_TIMEOUT,
	withCredentials: true,
	authRequired: true,
});
