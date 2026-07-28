import {
	convertSegmentToHourLabel,
	convertSegmentToTimeString,
} from '@utils/feed/scheduling/segment';
import { describe, expect, it } from 'vitest';

describe('시간 눈금 표기', () => {
	it('자정은 0 AM이 아니라 12 AM으로 표기한다', () => {
		expect(convertSegmentToHourLabel(0)).toBe('12 AM');
	});

	it('정오는 0 PM이 아니라 12 PM으로 표기한다', () => {
		expect(convertSegmentToHourLabel(24)).toBe('12 PM');
	});

	it('9시 30분은 9시와 같은 눈금(9 AM)에 속한다', () => {
		expect(convertSegmentToHourLabel(19)).toBe('9 AM');
	});
});

describe('시각 표기', () => {
	it('정시는 9:00처럼 분을 두 자리로 표기한다', () => {
		expect(convertSegmentToTimeString(18)).toBe('9:00');
	});

	it('9시 30분은 9:30으로 표기한다', () => {
		expect(convertSegmentToTimeString(19)).toBe('9:30');
	});
});
