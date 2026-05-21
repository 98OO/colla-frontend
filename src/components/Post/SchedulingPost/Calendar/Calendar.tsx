/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Dispatch, SetStateAction } from 'react';
import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import DateCell from '@components/Post/SchedulingPost/Calendar/DateCell/DateCell';
import { useCalendar } from '@hooks/common/calendar/useCalendar';
import { DateManager } from '@utils/common/DateManager';
import { WEEKDAYS } from '@constants/calendar';
import type { DateString } from '@type/post';
import * as S from './Calendar.styled';

interface CalendarProps {
	selectedDates: Set<DateString>;
	setSelectedDates: Dispatch<SetStateAction<Set<DateString>>>;
}

const Calendar = ({ selectedDates, setSelectedDates }: CalendarProps) => {
	const today = new Date();

	const { current, dateCells, prevMonth, nextMonth } = useCalendar(today);
	const isSameMonth = DateManager.isSameMonth(current, today);

	return (
		<S.CalendarContainer>
			<S.Month>
				{current.toLocaleDateString('ko-KR', {
					month: 'long',
					year: 'numeric',
				})}
			</S.Month>
			<Flex gap='12' align='center'>
				<IconButton
					ariaLabel='prevMonth'
					icon='ChevronLeft'
					onClick={prevMonth}
					disabled={isSameMonth}
				/>
				<S.CalendarGrid>
					{WEEKDAYS.map((day) => (
						<S.WeekDaysWrapper key={day}>{day}</S.WeekDaysWrapper>
					))}
					{dateCells.map((date, idx) => {
						return <DateCell key={date ? date.toISOString() : `EmptyCell-${idx}`} date={date} />;
					})}
				</S.CalendarGrid>
				<IconButton ariaLabel='nextMonth' icon='ChevronRight' onClick={nextMonth} />
			</Flex>
		</S.CalendarContainer>
	);
};

export default Calendar;
