import type { TimePoint } from '@type/post';

const calcTimeSegment = ({ period, time }: TimePoint) => {
	const [hour, minute] = time.split(':').map(Number);
	const convertedHour = period === '오후' ? hour + 12 : hour;

	return convertedHour * 2 + (minute === 30 ? 1 : 0);
};

export { calcTimeSegment };
