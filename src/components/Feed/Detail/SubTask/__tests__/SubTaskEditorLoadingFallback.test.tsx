import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import SubTaskEditorLoadingFallback from '../SubTaskEditorLoadingFallback';

describe('SubTaskEditorLoadingFallback', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
	});

	test('로딩 시간이 200ms 미만이면 fallback을 표시하지 않는다', () => {
		const { container } = render(<SubTaskEditorLoadingFallback />);

		act(() => vi.advanceTimersByTime(199));

		expect(screen.queryByRole('status')).not.toBeInTheDocument();
		expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
	});

	test('표시 전에도 편집기 영역을 예약한다', () => {
		const { container } = render(<SubTaskEditorLoadingFallback />);

		expect(container.firstElementChild).toHaveStyle({
			width: '680px',
			height: '413px',
			visibility: 'hidden',
		});
	});

	test('로딩 시간이 200ms 이상이면 편집기 fallback을 표시한다', () => {
		render(<SubTaskEditorLoadingFallback />);

		act(() => vi.advanceTimersByTime(200));

		expect(
			screen.getByRole('status', { name: '하위 업무 편집기를 불러오는 중' })
		).toBeInTheDocument();
	});
});
