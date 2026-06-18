import { useCallback, useMemo, useState } from 'react';
import { makeDateCells } from '@utils/calendar/makeDateCells';

export const useCalendar = (baseDate: Date) => {
	const [current, setCurrent] = useState<Date>(baseDate);

	const prevMonth = useCallback(() => {
		setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
	}, []);

	const nextMonth = useCallback(() => {
		setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
	}, []);

	const dateCells = useMemo(() => makeDateCells(current), [current]);

	return { current, dateCells, prevMonth, nextMonth };
};
