import { isPastSlot } from '@utils/feed/scheduling/past';
import { describe, expect, it } from 'vitest';

// "현재 시각"을 2026-07-15 10:00으로 고정합니다. 아래 날짜들은 BASE 기준의 상대 관계입니다.
const BASE = new Date(2026, 6, 15, 10, 0);

const TODAY = '2026-07-15';
const YESTERDAY = '2026-07-14';
const TOMORROW = '2026-07-16';

const SEGMENT_9AM = 18;
const SEGMENT_10AM = 20;
const SEGMENT_10_30AM = 21;
const SEGMENT_11AM = 22;

describe('지난 시간 판별', () => {
	it('지나간 날짜는 시간과 관계없이 모두 지난 시간이다', () => {
		expect(isPastSlot(YESTERDAY, SEGMENT_11AM, BASE)).toBe(true);
	});

	it('앞으로 올 날짜는 시간과 관계없이 지난 시간이 아니다', () => {
		expect(isPastSlot(TOMORROW, SEGMENT_9AM, BASE)).toBe(false);
	});

	it('오늘이라도 아직 오지 않은 시간은 지난 시간이 아니다', () => {
		expect(isPastSlot(TODAY, SEGMENT_10_30AM, BASE)).toBe(false);
	});

	it('지금 진행 중인 시간대는 이미 시작했으므로 지난 시간으로 본다', () => {
		expect(isPastSlot(TODAY, SEGMENT_10AM, BASE)).toBe(true);
	});
});
