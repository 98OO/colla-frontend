/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Dispatch, SetStateAction } from 'react';
import { useCalendar } from '@hooks/common/calendar/useCalendar';
import type { DateString } from '@type/post';

interface CalendarProps {
	selectedDates: Set<DateString>;
	setSelectedDates: Dispatch<SetStateAction<Set<DateString>>>;
}

const Calendar = ({ selectedDates, setSelectedDates }: CalendarProps) => {
	const today = new Date();
	const { current, dateCells, prevMonth, nextMonth } = useCalendar(today);

	return <div>Calendar</div>;
};

export default Calendar;
