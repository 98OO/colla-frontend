import { DateManager } from '@utils/common/DateManager';
import type { DateString, TimeString } from '@type/post';

const isPastTime = (target: DateString, time: TimeString, base = new Date()): boolean => {
	const [year, month, day] = target.split('-').map(Number);
	const targetDate = new Date(year, month - 1, day);

	if (DateManager.isPastDate(targetDate, base)) return true;
	if (!DateManager.isToday(targetDate, base)) return false;

	const [hours, minutes] = time.split(':').map(Number);
	const baseMinutes = base.getHours() * 60 + base.getMinutes();

	return hours * 60 + minutes <= baseMinutes;
};

export default isPastTime;
