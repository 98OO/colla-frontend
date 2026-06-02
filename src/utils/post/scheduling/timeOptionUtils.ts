import { DEFAULT_TIME_OPTIONS } from '@constants/post';
import type { TimeString } from '@type/post';

const calcTimeSegment = (time: TimeString) => {
	const [hour, minute] = time.split(':').map(Number);

	return hour * 2 + (minute === 30 ? 1 : 0);
};

const filterTimeOptions = (criteria: TimeString, condition: 'earlier' | 'later') => {
	const criteriaSegment = calcTimeSegment(criteria);

	return DEFAULT_TIME_OPTIONS.filter((timeOption) => {
		const timeOptionSegment = calcTimeSegment(timeOption);

		return condition === 'earlier'
			? criteriaSegment > timeOptionSegment
			: criteriaSegment < timeOptionSegment;
	});
};

export { calcTimeSegment, filterTimeOptions };
