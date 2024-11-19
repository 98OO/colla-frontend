import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import useOutsideClick from '@hooks/common/useOutSideClick';
import { useOverlay } from '@hooks/common/useOverlay';
import useCalendar from '@hooks/post/useCalendar';
import { CalendarProps } from '@type/post';
import * as S from './DatePicker.styled';

const DatePicker = ({
	selectedDays,
	isDaySelected,
	toggleDaySelection,
}: CalendarProps) => {
	const HEADER_DAYS = ['일', '월', '화', '수', '목', '금', '토'];
	const {
		curMonth,
		calendarDays,
		movePrevMonth,
		moveNextMonth,
		isPrevDisabled,
		isNextDisabled,
		isDayDisabled,
		getFormattedDay,
	} = useCalendar();

	const { isOpen, open, close } = useOverlay();

	const ref = useOutsideClick({
		onClickOutside: close,
	});

	return (
		<Flex justify='space-between'>
			<S.DatePickerButton onClick={open}>
				{getFormattedDay(selectedDays[0])}
			</S.DatePickerButton>
			<S.CalendarContainer ref={ref} isOpen={isOpen}>
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
						const isSelected = isDaySelected(selectedDays, calendarDay);
						return (
							<S.DateCell
								key={`${calendarDay.year}-${calendarDay.month}-${calendarDay.day}`}
								isDisabled={isDisabled}
								isSelected={isSelected}
								onClick={() => toggleDaySelection(calendarDay)}>
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
