import { useNavigation } from 'react-router-dom';
import RouteProgressBar from '@components/common/RouteProgressBar/RouteProgressBar';
import { act, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import theme from '@styles/theme';

vi.mock('react-router-dom', async (importOriginal) => {
	const actual = await importOriginal<typeof import('react-router-dom')>();

	return {
		...actual,
		useNavigation: vi.fn(),
	};
});

const mockedUseNavigation = vi.mocked(useNavigation);

const setNavigationState = (state: 'idle' | 'loading') => {
	mockedUseNavigation.mockReturnValue({
		state,
	} as ReturnType<typeof useNavigation>);
};

const renderProgressBar = () =>
	render(
		<ThemeProvider theme={theme}>
			<RouteProgressBar />
		</ThemeProvider>
	);

describe('RouteProgressBar', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		setNavigationState('idle');
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
		vi.clearAllMocks();
	});

	test('500ms 미만에 끝나는 전환에는 프로그레스바를 표시하지 않는다', () => {
		setNavigationState('loading');
		const { rerender } = renderProgressBar();

		act(() => vi.advanceTimersByTime(499));
		expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

		setNavigationState('idle');
		rerender(
			<ThemeProvider theme={theme}>
				<RouteProgressBar />
			</ThemeProvider>
		);
		act(() => vi.runAllTimers());

		expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
	});

	test('전환이 500ms 이상 지속되면 프로그레스바를 표시한다', () => {
		setNavigationState('loading');
		renderProgressBar();

		act(() => vi.advanceTimersByTime(500));

		expect(screen.getByRole('progressbar', { name: '페이지 이동 중' })).toBeInTheDocument();
	});

	test('전환이 완료되면 완료 표현 후 프로그레스바를 제거한다', () => {
		setNavigationState('loading');
		const { rerender } = renderProgressBar();
		act(() => vi.advanceTimersByTime(500));

		setNavigationState('idle');
		rerender(
			<ThemeProvider theme={theme}>
				<RouteProgressBar />
			</ThemeProvider>
		);

		expect(screen.getByRole('progressbar')).toBeInTheDocument();
		act(() => vi.advanceTimersByTime(240));
		expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
	});
});
