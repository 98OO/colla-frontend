import { QueryClient } from '@tanstack/react-query';
import useToastStore from '@stores/toastStore';
import { COMMON_ERROR_MESSAGE } from '@constants/api';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			throwOnError: true,
		},
		mutations: {
			onError: () => {
				useToastStore.getState().makeToast(COMMON_ERROR_MESSAGE.REQUEST_FAILED, 'Warning');
			},
		},
	},
});
