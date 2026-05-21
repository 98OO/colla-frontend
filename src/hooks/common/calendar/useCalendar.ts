import { useCallback, useState } from 'react';
import { makeDateCells } from '@utils/calendar/makeDateCells';

export const useCalendar = (date: Date) => {
	const [current, setCurrent] = useState<Date>(date);

	const prevMonth = useCallback(() => {
		setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
	}, []);

	const nextMonth = useCallback(() => {
		setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
	}, []);

	const dateCells = makeDateCells(current);

	return { current, dateCells, prevMonth, nextMonth };
};
