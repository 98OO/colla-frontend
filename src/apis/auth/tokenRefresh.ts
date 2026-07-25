import { invalidateSession, isCurrentSession } from '@apis/auth/sessionActions';
import { getNewToken } from '@apis/user/getNewToken';
import axios from 'axios';
import useAuthStore from '@stores/authStore';
import { HTTPError } from '@apis/HTTPError';
import { SESSION_INVALID_CODES } from '@constants/api';

let refreshPromise: Promise<string> | null = null;

export const refreshAccessToken = () => {
	if (!refreshPromise) {
		const requestSessionVersion = useAuthStore.getState().sessionVersion;

		refreshPromise = getNewToken()
			.then(({ accessToken }) => {
				if (!isCurrentSession(requestSessionVersion)) {
					throw new axios.CanceledError();
				}

				useAuthStore.getState().updateSession(accessToken);
				return accessToken;
			})
			.catch((error) => {
				if (
					error instanceof HTTPError &&
					error.code !== undefined &&
					SESSION_INVALID_CODES.has(error.code)
				) {
					invalidateSession(error.code, requestSessionVersion);
				}

				throw error;
			})
			.finally(() => {
				refreshPromise = null;
			});
	}

	return refreshPromise;
};

export const getPendingRefreshPromise = () => refreshPromise;
