import { DateManager } from '@utils/common/DateManager';
import type { DateString, TimeString } from '@type/post';

const isPastTime = (target: DateString, time: TimeString, base = new Date()): boolean => {
	if (DateManager.isPastDate(new Date(target), base)) return true;
	if (!DateManager.isToday(new Date(target), base)) return false;

	const [hours, minutes] = time.split(':').map(Number);
	const baseMinutes = base.getHours() * 60 + base.getMinutes();

	return hours * 60 + minutes <= baseMinutes;
};

export default isPastTime;
