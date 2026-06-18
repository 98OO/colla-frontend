import type { TimeString } from '@type/post';

export const formatTime = (hours: number, minutes: number): TimeString => {
	const HH = String(hours).padStart(2, '0');
	const MM = String(minutes).padStart(2, '0');

	return `${HH}:${MM}` as TimeString;
};
