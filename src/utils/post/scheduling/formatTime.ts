import type { Time } from '@type/post';

const formatTime = ({ hours, minutes }: Time): string => {
	const meridiem = hours < 12 ? '오전' : '오후';
	const displayHours = hours % 12 === 0 ? 12 : hours % 12;

	const HH = String(displayHours).padStart(2, '0');
	const MM = String(minutes).padStart(2, '0');

	return `${meridiem} ${HH}:${MM}`;
};

export default formatTime;
