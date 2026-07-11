import type {
	AvailabilityColumn,
	AvailabilityFlag,
	SchedulingResponse,
	TotalAvailability,
	UserAvailability,
} from '@type/feed';
import { SEGMENTS_PER_DAY } from './segment';
import { makeSlotId, parseSlotId } from './slotId';

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

const toSelectedSlots = (
	userAvailabilities: UserAvailability,
	minTimeSegment: number,
	maxTimeSegment: number
): Set<string> => {
	const selectedSlots = new Set<string>();

	Object.entries(userAvailabilities).forEach(([date, segments]) => {
		const segmentsInRange = segments.slice(minTimeSegment, maxTimeSegment);

		segmentsInRange.forEach((availabilityFlag, idx) => {
			const isAvailable = availabilityFlag === 1;
			if (!isAvailable) return;

			const slotId = makeSlotId(date, idx, minTimeSegment);
			selectedSlots.add(slotId);
		});
	});

	return selectedSlots;
};

export const getUserScheduleInfo = (
	responses: SchedulingResponse[],
	userId: number | undefined,
	minTimeSegment: number,
	maxTimeSegment: number
) => {
	const userResponse = responses.find(({ user }) => user.id === userId);

	const isParticipating = userResponse !== undefined;
	const initialSelectedSlots = userResponse
		? toSelectedSlots(userResponse.availabilities, minTimeSegment, maxTimeSegment)
		: new Set<string>();

	return { isParticipating, initialSelectedSlots };
};
