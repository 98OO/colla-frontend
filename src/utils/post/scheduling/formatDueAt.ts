import type { DateString, Time } from '@type/post';

export const formatDueAt = (date: DateString, time: Time | null): string => {
	if (!time) return `${date} 23:59`;

	const HH = String(time.hours).padStart(2, '0');
	const MM = String(time.minutes).padStart(2, '0');

	return `${date} ${HH}:${MM}`;
};
