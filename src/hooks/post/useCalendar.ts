import { useState } from 'react';
import { getDaysInMonth, addMonths, subMonths, startOfDay } from 'date-fns';

const CALENDAR_LENGTH = 35;

interface Day {
	year: number;
	month: number;
	day: number;
}

const useCalendar = () => {
	const [curDate, setCurDate] = useState(startOfDay(new Date()));

	const curYear = curDate.getFullYear();
	const curMonth = curDate.getMonth();

	const prevMonth = subMonths(curDate, 1);
	const nextMonth = addMonths(curDate, 1);

	const daysInMonth = getDaysInMonth(curDate);
	const daysInPrevMonth = getDaysInMonth(prevMonth);

	const startDayOfMonth = new Date(curYear, curMonth, 1).getDay();

	const createDayObject = ({ year, month, day }: Day) => ({
		year,
		month: month + 1,
		day,
	});

	const prevDays = Array.from({ length: startDayOfMonth }).map((_, idx) =>
		createDayObject({
			year: prevMonth.getFullYear(),
			month: prevMonth.getMonth(),
			day: daysInPrevMonth - startDayOfMonth + idx + 1,
		})
	);

	const curDays = Array.from({ length: daysInMonth }).map((_, idx) =>
		createDayObject({
			year: curYear,
			month: curMonth,
			day: idx + 1,
		})
	);

	const remainingDays = CALENDAR_LENGTH - (prevDays.length + curDays.length);
	const nextDays = Array.from({ length: remainingDays }).map((_, idx) =>
		createDayObject({
			year: nextMonth.getFullYear(),
			month: nextMonth.getMonth(),
			day: idx + 1,
		})
	);

	const calendarDays = [...prevDays, ...curDays, ...nextDays];

	const movePrevMonth = () => {
		setCurDate((prevDate) => subMonths(prevDate, 1));
	};

	const moveNextMonth = () => {
		setCurDate((prevDate) => addMonths(prevDate, 1));
	};

	return {
		curMonth: curMonth + 1,
		calendarDays,
		movePrevMonth,
		moveNextMonth,
	};
};

export default useCalendar;
