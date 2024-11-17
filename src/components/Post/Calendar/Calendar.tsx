import useCalendar from '@hooks/post/useCalendar';
import * as S from './Calendar.styled';

const Calendar = () => {
	const HEADER_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	const { curMonth, calendarDays } = useCalendar();

	return (
		<S.CalendarContainer>
			<S.Month>{curMonth}월</S.Month>
			<S.WeeksWrapper>
				{HEADER_DAYS.map((day) => (
					<S.HeaderWrapper key={day}>{day}</S.HeaderWrapper>
				))}
				{calendarDays.map((calendarDay) => {
					return (
						<S.DateWrapper>
							<S.Date>{calendarDay.day}</S.Date>
						</S.DateWrapper>
					);
				})}
			</S.WeeksWrapper>
		</S.CalendarContainer>
	);
};

export default Calendar;
