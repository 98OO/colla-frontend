import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import useCalendar from '@hooks/post/useCalendar';
import useDaySelection from '@hooks/post/useDaySelection';
import * as S from './Calendar.styled';

const Calendar = () => {
	const HEADER_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	const {
		curMonth,
		calendarDays,
		getToday,
		movePrevMonth,
		moveNextMonth,
		isPrevDisabled,
		isNextDisabled,
		isDayDisabled,
	} = useCalendar();

	const { selectedDays, isDaySelected, toggleDaySelection } = useDaySelection([
		getToday(),
	]);

	return (
		<S.CalendarContainer>
			<S.Month>{curMonth}월</S.Month>
			<Flex gap='12' align='center'>
				<IconButton
					ariaLabel='prevMonth'
					icon='ChevronLeft'
					onClick={movePrevMonth}
					disabled={isPrevDisabled()}
				/>
				<S.WeeksWrapper>
					{HEADER_DAYS.map((day) => (
						<S.HeaderWrapper key={day}>{day}</S.HeaderWrapper>
					))}
					{calendarDays.map((calendarDay) => {
						const isDisabled = isDayDisabled(calendarDay);
						const isSelected = isDaySelected(selectedDays, calendarDay);
						return (
							<S.DateWrapper
								key={`${calendarDay.year}-${calendarDay.month}-${calendarDay.day}`}
								isDisabled={isDisabled}
								onClick={() => toggleDaySelection(calendarDay)}>
								<S.Date isSelected={isSelected}>{calendarDay.day}</S.Date>
							</S.DateWrapper>
						);
					})}
				</S.WeeksWrapper>
				<IconButton
					ariaLabel='nextMonth'
					icon='ChevronRight'
					onClick={moveNextMonth}
					disabled={isNextDisabled()}
				/>
			</Flex>
		</S.CalendarContainer>
	);
};

export default Calendar;
