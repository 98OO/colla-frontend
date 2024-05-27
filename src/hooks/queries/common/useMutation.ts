import { useState } from 'react';
import { HTTPError } from '@apis/HTTPError';

type FetchFn<T> = () => Promise<T>;
type Props<T> = {
	onSuccess?: (data: T) => void;
	onError?: (error: Error) => void;
};

export const useMutation = <T>({ onSuccess, onError }: Props<T>) => {
	const [error, setError] = useState<HTTPError | null>(null);

	const mutate = async (fetchFn: FetchFn<T>) => {
		try {
			const data = await fetchFn();
			if (onSuccess) onSuccess(data);
		} catch (err) {
			if (err instanceof HTTPError) {
				if (!onError) setError(err);
				else onError(err);
			}
		}
	};

	if (error) throw error;

	return { mutate };
};
