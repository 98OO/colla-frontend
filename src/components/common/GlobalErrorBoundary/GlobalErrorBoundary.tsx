/* eslint-disable no-console */
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@components/common/ErrorFallback/ErrorFallback';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { HTTPError } from '@apis/HTTPError';

interface Props {
	children: React.ReactNode;
}

const logError = (error: Error | HTTPError) => {
	if (error instanceof HTTPError) {
		const { status, code, message, content } = error;
		console.groupCollapsed(`HTTPError: ${status} ${message}`);
		console.log('Status:', status);
		console.log('Code:', code);
		console.log('Message:', message);
		console.log('Content:', content);
		console.groupEnd();
	} else {
		console.error(error);
	}
};

const GlobalErrorBoundary = ({ children }: Props) => {
	const { reset } = useQueryErrorResetBoundary();

	return (
		<ErrorBoundary
			onError={logError}
			FallbackComponent={ErrorFallback}
			onReset={reset}>
			{children}
		</ErrorBoundary>
	);
};

export default GlobalErrorBoundary;
