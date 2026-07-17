import { useMutation as useBaseMutation } from '@tanstack/react-query';
import useToastStore from '@stores/toastStore';
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
	const { makeToast } = useToastStore();

	const { mutateAsync, isPending } = useBaseMutation({
		mutationFn: (fetchFn: FetchFn<T>) => fetchFn(),
		onSuccess,
		onError: (error: Error) => {
			if (onError) onError(error);
			else makeToast(COMMON_ERROR_MESSAGE.REQUEST_FAILED, 'Warning');
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
