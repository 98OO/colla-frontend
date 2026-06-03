import type { DateString } from '@type/post';

export const formatDueAt = (
	date: DateString,
	time: { hours: number; minutes: number } | null
): string => {
	if (!time) return `${date} 23:59`;

	const HH = String(time.hours).padStart(2, '0');
	const MM = String(time.minutes).padStart(2, '0');

	return `${date} ${HH}:${MM}`;
};
