import { useCallback, useMemo, useState } from 'react';
import { formatDate } from '@utils/calendar/formatDate';
import { makeDateCells } from '@utils/calendar/makeDateCells';
import { DateManager } from '@utils/common/DateManager';

export const useCalendar = (baseDate: Date) => {
	const [current, setCurrent] = useState<Date>(baseDate);

	const prevMonth = useCallback(() => {
		setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
	}, []);

	const nextMonth = useCallback(() => {
		setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
	}, []);

	const dateCells = useMemo(() => {
		const today = new Date();
		const cells = makeDateCells(current);

		return cells.map((date) => {
			if (!date) return null;

			return {
				date: date.getDate(),
				dateString: formatDate(date),
				isPast: DateManager.isPast(date),
				isToday: DateManager.isSameDate(date, today),
			};
		});
	}, [current]);

	return { current, dateCells, prevMonth, nextMonth };
};
