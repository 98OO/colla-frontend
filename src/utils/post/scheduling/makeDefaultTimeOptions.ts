import { formatTime } from '@utils/post/scheduling/formatTime';
import type { TimeString } from '@type/post';

const MINUTES_IN_DAY = 24 * 60;

export const makeDefaultTimeOptions = (intervalMinutes: number) => {
	const timeOptions: TimeString[] = [];

	for (let minutes = 0; minutes < MINUTES_IN_DAY; minutes += intervalMinutes) {
		const hour = Math.floor(minutes / 60);
		const minute = minutes % 60;

		timeOptions.push(formatTime(hour, minute));
	}

	return timeOptions;
};
