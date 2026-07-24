import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useToastStore from '@stores/toastStore';
import { NetworkError } from '@apis/NetworkError';
import { COMMON_ERROR_MESSAGE } from '@constants/api';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			throwOnError: (error) => !axios.isCancel(error),
		},
		mutations: {
			onError: (error) => {
				if (axios.isCancel(error)) return;

				const message =
					error instanceof NetworkError
						? COMMON_ERROR_MESSAGE.NETWORK
						: COMMON_ERROR_MESSAGE.REQUEST_FAILED;

				useToastStore.getState().makeToast(message, 'Warning');
			},
		},
	},
});
