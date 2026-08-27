import {
	getAvailabilityColumnsInRange,
	getUserScheduleInfo,
	toUserAvailability,
} from '@utils/feed/scheduling/availability';
import { SEGMENTS_PER_DAY } from '@utils/feed/scheduling/segment';
import { makeSlotId } from '@utils/feed/scheduling/slotId';
import { describe, expect, it } from 'vitest';
import type { SchedulingResponse, TotalAvailability } from '@type/feed';

const MIN_TIME_SEGMENT = 18; // 09:00
const MAX_TIME_SEGMENT = 34; // 17:00

const USER_ID = 1;
const DATES = ['2026-07-15', '2026-07-16'];

const makeResponse = (
	availabilities: SchedulingResponse['availabilities']
): SchedulingResponse => ({
	availabilities,
	createdAt: '2026-07-01T09:00:00',
	user: { id: USER_ID, username: '강민재', profileImageUrl: '' },
});

const roundTrip = (selectedSlots: Set<string>) => {
	const availabilities = toUserAvailability(selectedSlots, DATES);
	const { initialSelectedSlots } = getUserScheduleInfo(
		[makeResponse(availabilities)],
		USER_ID,
		MIN_TIME_SEGMENT,
		MAX_TIME_SEGMENT
	);

	return initialSelectedSlots;
};

describe('가능 시간 저장과 복원', () => {
	it('선택한 가능 시간은 저장했다가 다시 열어도 그대로 복원된다', () => {
		const selectedSlots = new Set([
			makeSlotId('2026-07-15', 20),
			makeSlotId('2026-07-15', 21),
			makeSlotId('2026-07-16', 30),
		]);

		expect(roundTrip(selectedSlots)).toEqual(selectedSlots);
	});

	it('조회 범위의 시작과 끝 시간도 빠짐없이 복원된다', () => {
		const selectedSlots = new Set([
			makeSlotId('2026-07-15', MIN_TIME_SEGMENT),
			makeSlotId('2026-07-15', MAX_TIME_SEGMENT - 1),
		]);

		expect(roundTrip(selectedSlots)).toEqual(selectedSlots);
	});

	it('조회 범위 밖에 저장된 시간은 불러오지 않는다', () => {
		const outOfRangeSlots = new Set([
			makeSlotId('2026-07-15', MIN_TIME_SEGMENT - 1),
			makeSlotId('2026-07-15', MAX_TIME_SEGMENT),
		]);

		expect(roundTrip(outOfRangeSlots)).toEqual(new Set());
	});

	it('일정을 등록하지 않은 사용자는 미참여로 판별되고 선택된 시간이 없다', () => {
		const availabilities = toUserAvailability(new Set([makeSlotId('2026-07-15', 18)]), DATES);

		const { isParticipating, initialSelectedSlots } = getUserScheduleInfo(
			[makeResponse(availabilities)],
			999,
			MIN_TIME_SEGMENT,
			MAX_TIME_SEGMENT
		);

		expect(isParticipating).toBe(false);
		expect(initialSelectedSlots).toEqual(new Set());
	});

	it('일정을 등록한 사용자는 참여자로 판별된다', () => {
		const availabilities = toUserAvailability(new Set(), DATES);

		const { isParticipating } = getUserScheduleInfo(
			[makeResponse(availabilities)],
			USER_ID,
			MIN_TIME_SEGMENT,
			MAX_TIME_SEGMENT
		);

		expect(isParticipating).toBe(true);
	});
});

describe('날짜별 가능 인원 집계', () => {
	const makeIndexedSegments = () => Array.from({ length: SEGMENTS_PER_DAY }, (_, idx) => idx);

	it('날짜순으로 정렬한다', () => {
		const unordered: TotalAvailability = {
			'2026-07-16': makeIndexedSegments(),
			'2026-07-15': makeIndexedSegments(),
		};

		const columns = getAvailabilityColumnsInRange(unordered, MIN_TIME_SEGMENT, MAX_TIME_SEGMENT);

		expect(columns.map(([date]) => date)).toEqual(['2026-07-15', '2026-07-16']);
	});

	it('조회 범위에 해당하는 시간대만 잘라내 보여준다', () => {
		const totalAvailability: TotalAvailability = { '2026-07-15': makeIndexedSegments() };

		const [[, segments]] = getAvailabilityColumnsInRange(
			totalAvailability,
			MIN_TIME_SEGMENT,
			MAX_TIME_SEGMENT
		);

		expect(segments).toHaveLength(MAX_TIME_SEGMENT - MIN_TIME_SEGMENT);
		expect(segments[0]).toBe(MIN_TIME_SEGMENT);
		expect(segments[segments.length - 1]).toBe(MAX_TIME_SEGMENT - 1);
	});
});
