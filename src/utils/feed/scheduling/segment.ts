export const SEGMENTS_PER_HOUR = 2;
export const SEGMENTS_PER_DAY = 24 * SEGMENTS_PER_HOUR;
export const MINUTES_PER_SEGMENT = 60 / SEGMENTS_PER_HOUR;
export const HOURS_PER_PERIOD = 12;

export const convertSegmentToTimeLabel = (segment: number) => {
	const hour = Math.floor(segment / SEGMENTS_PER_HOUR);
	const period = hour < HOURS_PER_PERIOD ? 'AM' : 'PM';
	const periodHour = hour % HOURS_PER_PERIOD || HOURS_PER_PERIOD;

	return `${periodHour} ${period}`;
};
