import { useState } from 'react';
import { Day } from '@type/post';
import {
	getDaysInMonth,
	addMonths,
	subMonths,
	isBefore,
	isAfter,
	startOfDay,
	format,
} from 'date-fns';

const CALENDAR_LENGTH = 35;

const useCalendar = () => {
	const [curDate, setCurDate] = useState(startOfDay(new Date()));

	const today = startOfDay(new Date());
	const oneYearLater = startOfDay(addMonths(today, 12));

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

	const getToday = () => {
		return {
			year: today.getFullYear(),
			month: today.getMonth() + 1,
			day: today.getDate(),
		};
	};

	const isDayDisabled = ({ year, month, day }: Day) => {
		const currentDate = startOfDay(new Date(year, month - 1, day));
		return isBefore(currentDate, today) || isAfter(currentDate, oneYearLater);
	};

	const movePrevMonth = () => {
		if (isAfter(curDate, today)) {
			setCurDate((prevDate) => subMonths(prevDate, 1));
		}
	};

	const moveNextMonth = () => {
		if (isBefore(curDate, oneYearLater)) {
			setCurDate((prevDate) => addMonths(prevDate, 1));
		}
	};

	const isPrevDisabled = () => !isAfter(curDate, today);
	const isNextDisabled = () => !isBefore(curDate, oneYearLater);

	const getDayObject = (date: string): Day => {
		const [year, month, day] = date.split('-').map(Number);

		return { year, month: month - 1, day };
	};

	const getFormattedDay = (day: Day) => {
		return format(new Date(day.year, day.month, day.day), 'yyyy-MM-dd');
	};

	const getInitialDays = (targetDates: string[]) => {
		if (targetDates.length === 0) {
			return [getToday()];
		}

		return targetDates.map((date) => getDayObject(date));
	};

	return {
		curMonth: curMonth + 1,
		calendarDays,
		movePrevMonth,
		moveNextMonth,
		isPrevDisabled,
		isNextDisabled,
		isDayDisabled,
		getInitialDays,
		getFormattedDay,
	};
};

export default useCalendar;
