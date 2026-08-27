import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorFallback } from '@components/common/ErrorFallback/ErrorFallback';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

interface AsyncBoundaryProps {
	children: React.ReactNode;
	loadingFallback?: React.ReactNode;
	errorFallback?: React.ComponentType<FallbackProps>;
	resetKeys?: unknown[];
}

const AsyncBoundary = ({
	children,
	loadingFallback = null,
	errorFallback = ErrorFallback,
	resetKeys,
}: AsyncBoundaryProps) => {
	const { reset } = useQueryErrorResetBoundary();

	return (
		<ErrorBoundary FallbackComponent={errorFallback} onReset={reset} resetKeys={resetKeys}>
			<Suspense fallback={loadingFallback}>{children}</Suspense>
		</ErrorBoundary>
	);
};

export default AsyncBoundary;
