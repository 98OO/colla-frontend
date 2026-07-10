import type {
	AvailabilityColumn,
	AvailabilityFlag,
	TotalAvailability,
	UserAvailability,
} from '@type/feed';

const SEGMENTS_PER_HOUR = 2;
const SEGMENTS_PER_DAY = 24 * SEGMENTS_PER_HOUR;
const HOURS_PER_PERIOD = 12;

export const convertSegmentToTimeLabel = (segment: number) => {
	const hour = Math.floor(segment / SEGMENTS_PER_HOUR);
	const period = hour < HOURS_PER_PERIOD ? 'AM' : 'PM';
	const periodHour = hour % HOURS_PER_PERIOD || HOURS_PER_PERIOD;

	return `${periodHour} ${period}`;
};

export const getAvailabilityColumnsInRange = (
	totalAvailability: TotalAvailability,
	minTimeSegment: number,
	maxTimeSegment: number
): AvailabilityColumn[] => {
	const sortedColumns = Object.entries(totalAvailability).sort(([dateA], [dateB]) =>
		dateA.localeCompare(dateB)
	);

	return sortedColumns.map(
		([date, segments]): AvailabilityColumn => [date, segments.slice(minTimeSegment, maxTimeSegment)]
	);
};

export const makeSlotId = (date: string, index: number, offset = 0) => `${date}:${index + offset}`;

export const parseSlotId = (slotId: string): { date: string; segment: number } => {
	const [date, segment] = slotId.split(':');

	return { date, segment: Number(segment) };
};

const createEmptyUserAvailability = (dates: string[]): UserAvailability =>
	Object.fromEntries(
		dates.map((date) => [date, Array<AvailabilityFlag>(SEGMENTS_PER_DAY).fill(0)])
	);

export const toUserAvailability = (selectedSlots: Set<string>, dates: string[]) => {
	const userAvailabilities = createEmptyUserAvailability(dates);

	selectedSlots.forEach((slotId) => {
		const { date, segment } = parseSlotId(slotId);
		userAvailabilities[date][segment] = 1;
	});

	return userAvailabilities;
};
