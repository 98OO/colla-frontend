import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import PostLoadingFallback from '../PostLoadingFallback';

describe('PostLoadingFallback', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
	});

	test('로딩 시간이 200ms 미만이면 fallback을 표시하지 않는다', () => {
		const { container } = render(<PostLoadingFallback feedType='normal' />);

		act(() => vi.advanceTimersByTime(199));

		expect(screen.queryByRole('status')).not.toBeInTheDocument();
		expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
	});

	test.each([
		['normal', '565px'],
		['collect', '609px'],
		['scheduling', '580px'],
	] as const)('%s fallback은 표시 전에도 %s 높이를 예약한다', (feedType, height) => {
		const { container } = render(<PostLoadingFallback feedType={feedType} />);
		const fallback = container.firstElementChild;

		expect(fallback).toHaveStyle({ width: '680px', height, visibility: 'hidden' });
	});

	test('로딩 시간이 200ms 이상이면 카드형 fallback을 표시한다', () => {
		render(<PostLoadingFallback feedType='normal' />);

		act(() => vi.advanceTimersByTime(200));

		expect(
			screen.getByRole('status', { name: '게시글 작성 화면을 불러오는 중' })
		).toBeInTheDocument();
	});
});
