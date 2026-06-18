import { DateManager } from '@utils/common/DateManager';
import { COLUMN, ROW } from '@constants/calendar';

type DateCell = Date | null;

export const makeDateCells = (baseDate: Date): DateCell[] => {
	const y = baseDate.getFullYear();
	const m = baseDate.getMonth();

	const dateCount = DateManager.getDateCountInMonth(y, m);
	const firstDayInMonth = DateManager.getFirstDayInMonth(y, m);

	const dateCells = Array<DateCell>(ROW * COLUMN).fill(null);

	for (let i = 0; i < dateCount; i += 1) {
		dateCells[firstDayInMonth + i] = new Date(y, m, i + 1);
	}

	return dateCells;
};
