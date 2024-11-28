import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

type timeAvailability = Record<string, number[]>;

export const convertTimeString = (num: number) => {
	let hour = (num % 24) % 12;

	if (hour === 0) {
		hour = 12;
	}

	const period = num < 24 ? 'AM' : 'PM';

	return `${hour} ${period}`;
};

export const getDayAndDate = (dateString: string) => {
	const date = new Date(dateString);
	const dayOfWeek = format(date, 'EEEEEE', { locale: ko });
	const dayOfMonth = format(date, 'd');

	return { dayOfWeek, dayOfMonth };
};

export const getAvailabilityInRange = (
	total: timeAvailability,
	minTimeSegment: number,
	maxTimeSegment: number
) => {
	const entries = Object.entries(total);

	return entries.reduce((acc, [date, array]) => {
		acc[date] = array.slice(minTimeSegment, maxTimeSegment);

		return acc;
	}, {} as timeAvailability);
};

export const prepareAvailabilities = (
	selectedSlots: Set<string>,
	minTimeSegment: number
) => {
	const availabilities: timeAvailability = {};

	selectedSlots.forEach((slotId) => {
		const [date, index] = slotId.split(':');
		const timeIndex = parseInt(index, 10) + minTimeSegment;

		const isoDate = format(new Date(date), 'yyyy-MM-dd');

		if (!availabilities[isoDate]) {
			availabilities[isoDate] = Array(48).fill(0);
		}

		availabilities[isoDate][timeIndex] = 1;
	});

	return availabilities;
};

export const convertAvailabilityToSlots = (availability: timeAvailability) => {
	const entries = Object.entries(availability);

	return entries.reduce(
		(acc, [date, segments]) => {
			const availabilitySlots = [];

			for (let i = 0; i < segments.length; i += 2) {
				availabilitySlots.push(segments.slice(i, i + 2));
			}

			acc[date] = availabilitySlots;

			return acc;
		},
		{} as Record<string, number[][]>
	);
};
