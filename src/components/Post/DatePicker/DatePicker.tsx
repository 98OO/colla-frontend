import { useState } from 'react';
import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import useCalendar from '@hooks/post/useCalendar';
import * as S from './DatePicker.styled';

const DatePicker = () => {
	const [isOpen, setIsOpen] = useState(false);
	const HEADER_DAYS = ['일', '월', '화', '수', '목', '금', '토'];
	const {
		curMonth,
		calendarDays,
		movePrevMonth,
		moveNextMonth,
		isPrevDisabled,
		isNextDisabled,
		isDayDisabled,
	} = useCalendar();

	return (
		<Flex justify='space-between'>
			<S.DatePickerButton onClick={() => setIsOpen(true)}>
				2023.11.18
			</S.DatePickerButton>
			<S.CalendarContainer isOpen={isOpen}>
				<S.CalendarHeader>
					<IconButton
						ariaLabel='prevMonth'
						icon='ChevronLeft'
						onClick={movePrevMonth}
						disabled={isPrevDisabled()}
					/>
					<S.Month>{curMonth}월</S.Month>
					<IconButton
						ariaLabel='nextMonth'
						icon='ChevronRight'
						onClick={moveNextMonth}
						disabled={isNextDisabled()}
					/>
				</S.CalendarHeader>
				<S.WeeksWrapper>
					{HEADER_DAYS.map((day) => (
						<S.Cell key={day}>{day}</S.Cell>
					))}
					{calendarDays.map((calendarDay) => {
						const isDisabled = isDayDisabled(calendarDay);
						return (
							<S.DateCell
								key={`${calendarDay.year}-${calendarDay.month}-${calendarDay.day}`}
								isDisabled={isDisabled}
								onClick={() => {}}>
								{calendarDay.day}
							</S.DateCell>
						);
					})}
				</S.WeeksWrapper>
			</S.CalendarContainer>
		</Flex>
	);
};

export default DatePicker;
