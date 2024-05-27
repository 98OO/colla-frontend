import { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import Error from '@components/common/Error/Error';
import { HTTP_STATUS_CODE } from '@constants/api';
import { PATH } from '@constants/path';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
	const navigate = useNavigate();
	const { status } = error;

	const handleServerError = () => {
		resetErrorBoundary();
		navigate(PATH.ROOT);
	};

	if (status === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
		return <Error errorCode={status} resetError={handleServerError} />;
	}

	return <Error errorCode={status} resetError={resetErrorBoundary} />;
};
