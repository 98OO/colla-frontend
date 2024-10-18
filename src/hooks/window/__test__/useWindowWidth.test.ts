import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import useWindowWidth from '../useWindowWidth';

// Resize 이벤트를 트리거하기 위해 필요
const triggerResize = (width: number) => {
	window.innerWidth = width;
	window.dispatchEvent(new Event('resize'));
};

describe('useWindowWidth Hook', () => {
	test('초기 렌더링에서 창 너비가 1024px 이하인 경우 모바일 뷰가 설정되어야 한다', () => {
		// 창 너비를 1024 이하로 설정
		triggerResize(800);

		const { result } = renderHook(() => useWindowWidth());

		// isMobileView가 true이어야 함
		expect(result.current).toBe(true);
	});

	test('초기 렌더링에서 창 너비가 1025px 이상인 경우 데스크탑 뷰가 설정되어야 한다', () => {
		// 창 너비를 1025 이상으로 설정
		triggerResize(1200);

		const { result } = renderHook(() => useWindowWidth());

		// isMobileView가 false이어야 함
		expect(result.current).toBe(false);
	});

	test('창 크기가 변경되면 isMobileView가 업데이트되어야 한다', () => {
		const { result } = renderHook(() => useWindowWidth());

		// 창 너비를 1025로 변경
		act(() => {
			triggerResize(1025);
		});

		expect(result.current).toBe(false); // 데스크탑 뷰로 변경

		// 창 너비를 800으로 변경
		act(() => {
			triggerResize(800);
		});

		expect(result.current).toBe(true); // 모바일 뷰로 변경
	});

	test('컴포넌트 언마운트 시 이벤트 리스너가 제거되어야 한다', () => {
		const { unmount } = renderHook(() => useWindowWidth());

		// 스파이를 만들어 이벤트 리스너가 제거되었는지 확인
		const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

		// 훅 언마운트
		unmount();

		// removeEventListener가 호출되었는지 확인
		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			'resize',
			expect.any(Function)
		);
	});
});
