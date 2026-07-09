import { format } from 'date-fns';
import type { AvailabilityFlag, TotalAvailability, UserAvailability } from '@type/feed';

export const prepareAvailabilities = (
	selectedSlots: Set<string>,
	minTimeSegment: number,
	totalAvailability: TotalAvailability
) => {
	const availabilities: UserAvailability = {};

	Object.keys(totalAvailability).forEach((date) => {
		const isoDate = format(new Date(date), 'yyyy-MM-dd');
		availabilities[isoDate] = Array<AvailabilityFlag>(48).fill(0);
	});

	selectedSlots.forEach((slotId) => {
		const [date, index] = slotId.split(':');
		const timeIndex = parseInt(index, 10) + minTimeSegment;
		const isoDate = format(new Date(date), 'yyyy-MM-dd');
		availabilities[isoDate][timeIndex] = 1;
	});

	return availabilities;
};

const adjustBrightness = (colorValue: number, ratio: number) => {
	return Math.min(255, Math.max(0, colorValue + (255 - colorValue) * (1 - ratio)));
};

export const getSlotColor = (totalParticipants: number, availability: number): string => {
	const baseColor = { r: 84, g: 151, b: 255 };

	const ratio = availability / totalParticipants;

	const adjustedR = adjustBrightness(baseColor.r, ratio);
	const adjustedG = adjustBrightness(baseColor.g, ratio);
	const adjustedB = adjustBrightness(baseColor.b, ratio);

	return `rgb(${adjustedR}, ${adjustedG}, ${adjustedB})`;
};
