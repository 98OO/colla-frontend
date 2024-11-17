import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import useCalendar from '@hooks/post/useCalendar';
import * as S from './Calendar.styled';

const Calendar = () => {
	const HEADER_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	const { curMonth, calendarDays, movePrevMonth, moveNextMonth } =
		useCalendar();

	return (
		<S.CalendarContainer>
			<S.Month>{curMonth}월</S.Month>
			<Flex gap='12' align='center'>
				<IconButton
					ariaLabel='prevMonth'
					icon='ChevronLeft'
					onClick={movePrevMonth}
				/>
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
				<IconButton
					ariaLabel='nextMonth'
					icon='ChevronRight'
					onClick={moveNextMonth}
				/>
			</Flex>
		</S.CalendarContainer>
	);
};

export default Calendar;
