import { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import Error from '@components/common/Error/Error';
import { HTTPError } from '@apis/HTTPError';
import { NetworkError } from '@apis/NetworkError';
import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from '@constants/api';
import type { ErrorMessage } from '@constants/api';
import { PATH } from '@constants/path';

interface ErrorFallbackInfo {
	message: ErrorMessage;
	recovery: 'retry' | 'navigate';
}

const errorToFallbackInfo = (error: unknown): ErrorFallbackInfo => {
	if (error instanceof NetworkError) {
		return { message: HTTP_ERROR_MESSAGE.NETWORK, recovery: 'retry' };
	}

	if (error instanceof HTTPError) {
		const { status } = error;

		if (status === HTTP_STATUS_CODE.FORBIDDEN) {
			return { message: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.FORBIDDEN], recovery: 'navigate' };
		}
		if (status === HTTP_STATUS_CODE.NOT_FOUND) {
			return { message: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.NOT_FOUND], recovery: 'navigate' };
		}
		if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
			return {
				message: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR],
				recovery: 'retry',
			};
		}
	}

	return { message: HTTP_ERROR_MESSAGE.DEFAULT, recovery: 'retry' };
};

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
	const navigate = useNavigate();
	const { message, recovery } = errorToFallbackInfo(error);

	const handleReset = () => {
		resetErrorBoundary();
		if (recovery === 'navigate') navigate(PATH.ROOT);
	};

	return <Error errorMessage={message} resetError={handleReset} />;
};
