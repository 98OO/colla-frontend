const SEGMENTS_PER_HOUR = 2;
const HOURS_PER_PERIOD = 12;

export const convertSegmentToTimeLabel = (segment: number) => {
	const hour = Math.floor(segment / SEGMENTS_PER_HOUR);
	const period = hour < HOURS_PER_PERIOD ? 'AM' : 'PM';
	const periodHour = hour % HOURS_PER_PERIOD || HOURS_PER_PERIOD;

	return `${periodHour} ${period}`;
};
