import { formatDate } from '@utils/calendar/formatDate';
import { formatTime } from '@utils/post/scheduling/formatTime';
import { INTERVAL_MINUTES } from '@constants/post';

const getDefaultDueAt = (base = new Date()) => {
	const dueAt = new Date(base);
	dueAt.setDate(dueAt.getDate() + 1);

	const remainder = dueAt.getMinutes() % INTERVAL_MINUTES;

	if (remainder !== 0) {
		const adjustment = remainder < INTERVAL_MINUTES / 2 ? -remainder : INTERVAL_MINUTES - remainder;
		dueAt.setMinutes(dueAt.getMinutes() + adjustment);
	}

	dueAt.setSeconds(0, 0);

	return {
		dueAtDate: formatDate(dueAt),
		dueAtTime: formatTime(dueAt.getHours(), dueAt.getMinutes()),
	};
};

export default getDefaultDueAt;
