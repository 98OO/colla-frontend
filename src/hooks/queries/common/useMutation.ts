import { useMutation as useBaseMutation } from '@tanstack/react-query';
import useToastStore from '@stores/toastStore';
import { NetworkError } from '@apis/NetworkError';
import { COMMON_ERROR_MESSAGE } from '@constants/api';

type FetchFn<T> = () => Promise<T>;
type Props<T> = {
	onSuccess?: (data: T) => void;
	onError?: (error: Error) => void;
};

/**
 * @deprecated
 */
export const useMutation = <T>({ onSuccess, onError }: Props<T>) => {
	const { mutateAsync, isPending } = useBaseMutation({
		mutationFn: (fetchFn: FetchFn<T>) => fetchFn(),
		onSuccess,
		onError: (error: Error) => {
			if (onError) {
				onError(error);
				return;
			}

			const message =
				error instanceof NetworkError
					? COMMON_ERROR_MESSAGE.NETWORK
					: COMMON_ERROR_MESSAGE.REQUEST_FAILED;

			useToastStore.getState().makeToast(message, 'Warning');
		},
	});

	const mutate = async (fetchFn: FetchFn<T>) => {
		try {
			return await mutateAsync(fetchFn);
		} catch {
			return undefined; // 기존 동작 유지
		}
	};

	return { mutate, isPending };
};
