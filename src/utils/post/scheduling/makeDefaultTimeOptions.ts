import { TimeString } from '@type/post';

const toTimeString = (time: string): TimeString => time as unknown as TimeString;

export const makeDefaultTimeOptions = () => {
	const timeOptions: TimeString[] = [];

	for (let h = 0; h < 24; h += 1) {
		const HH = String(h).padStart(2, '0');

		timeOptions.push(toTimeString(`${HH}:00`));
		timeOptions.push(toTimeString(`${HH}:30`));
	}

	return timeOptions;
};
