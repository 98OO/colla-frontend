import { formatDate } from '@utils/calendar/formatDate';
import { DateManager } from '@utils/common/DateManager';
import type { DateString } from '@type/post';

export const getDateCellState = (date: Date, selectedDates: Set<DateString>) => {
	return {
		isPast: DateManager.isPast(date),
		isToday: DateManager.isToday(date),
		isSelected: selectedDates.has(formatDate(date)),
	};
};
