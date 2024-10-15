import { useOverlay } from '@hooks/common/useOverlay';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('useOverlay.test > ', () => {
	test('초기 상태는 isOpen이 false여야 한다', () => {
		const { result } = renderHook(() => useOverlay());
		expect(result.current.isOpen).toEqual(false);
	});

	test('open을 호출하면 isOpen이 true로 변경되어야 한다', () => {
		const { result } = renderHook(() => useOverlay());
		act(() => {
			result.current.open();
		});
		expect(result.current.isOpen).toEqual(true);
	});

	test('close를 호출하면 isOpen이 false로 변경되어야 한다', () => {
		const { result } = renderHook(() => useOverlay());
		act(() => {
			result.current.open(); // 먼저 open을 호출해 true로 만든 후
			result.current.close(); // close로 false로 변경
		});
		expect(result.current.isOpen).toEqual(false);
	});
});
