import { useState } from 'react';
import useDateSelection from '@hooks/post/scheduling/useDateSelection';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { DateString } from '@type/post';

const SOME_DATE = '2099-01-01' as DateString;
const OTHER_DATE = '2099-01-02' as DateString;

function createDateSelection() {
	const { result } = renderHook(() => {
		const [selectedDates, setSelectedDates] = useState<Set<DateString>>(new Set());
		const handlers = useDateSelection(setSelectedDates);

		return { selectedDates, ...handlers };
	});
	return result;
}

describe('날짜 선택', () => {
	it('날짜를 클릭하면 선택된다', () => {
		const result = createDateSelection();

		act(() => result.current.handlePointerDown(SOME_DATE, false));

		expect(result.current.selectedDates.has(SOME_DATE)).toBe(true);
	});

	it('선택된 날짜를 다시 클릭하면 선택 해제된다', () => {
		const result = createDateSelection();
		act(() => result.current.handlePointerDown(SOME_DATE, false));

		act(() => result.current.handlePointerDown(SOME_DATE, false));

		expect(result.current.selectedDates.has(SOME_DATE)).toBe(false);
	});

	it('지난 날짜는 선택할 수 없다', () => {
		const result = createDateSelection();

		act(() => result.current.handlePointerDown(SOME_DATE, true));

		expect(result.current.selectedDates.has(SOME_DATE)).toBe(false);
	});

	it('드래그하면 지나간 날짜들이 모두 선택된다', () => {
		const result = createDateSelection();

		act(() => {
			result.current.handlePointerDown(SOME_DATE, false);
			result.current.handlePointerEnter(OTHER_DATE, false);
		});

		expect(result.current.selectedDates.has(SOME_DATE)).toBe(true);
		expect(result.current.selectedDates.has(OTHER_DATE)).toBe(true);
	});

	it('이미 선택된 날짜에서 드래그를 시작하면 지나간 날짜들이 선택 해제된다', () => {
		const result = createDateSelection();

		act(() => result.current.handlePointerDown(SOME_DATE, false));
		act(() => result.current.handlePointerDown(OTHER_DATE, false));

		act(() => {
			result.current.handlePointerDown(SOME_DATE, false);
			result.current.handlePointerEnter(OTHER_DATE, false);
		});

		expect(result.current.selectedDates.has(SOME_DATE)).toBe(false);
		expect(result.current.selectedDates.has(OTHER_DATE)).toBe(false);
	});

	it('드래그 중 손을 떼면 이후 날짜에 진입해도 선택되지 않는다', () => {
		const result = createDateSelection();

		act(() => result.current.handlePointerDown(SOME_DATE, false));
		act(() => {
			document.dispatchEvent(new Event('pointerup'));
		});
		act(() => {
			result.current.handlePointerEnter(OTHER_DATE, false);
		});

		expect(result.current.selectedDates.has(OTHER_DATE)).toBe(false);
	});
});
