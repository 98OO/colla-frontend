import { useState } from 'react';
import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';
import Toggle from '@components/common/Toggle/Toggle';
import { useCalendar } from '@hooks/common/calendar/useCalendar';
import useOutsideClick from '@hooks/common/useOutSideClick';
import { useOverlay } from '@hooks/common/useOverlay';
import { formatDate } from '@utils/calendar/formatDate';
import { DateManager } from '@utils/common/DateManager';
import getParsedTime from '@utils/getParsedTime';
import { WEEKDAYS } from '@constants/calendar';
import type { DateString, Time } from '@type/post';
import * as S from './DatePicker.styled';

interface DatePickerProps {
	selectedDate: DateString;
	onDateChange: (date: DateString) => void;
	time: Time | null;
	onTimeChange: (time: Time | null) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DatePicker = ({ selectedDate, onDateChange, time, onTimeChange }: DatePickerProps) => {
	const today = new Date();
	const oneYearLimit = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

	const { current, dateCells, prevMonth, nextMonth } = useCalendar(today);
	const { isOpen, open, close } = useOverlay();

	const ref = useOutsideClick({ onClickOutside: close });

	const isPrevDisabled = DateManager.isSameMonth(current, today);
	const isNextDisabled = DateManager.isAfter(current, oneYearLimit);

	const [toggleState, setToggleState] = useState(false);
	const [timeInput, setTimeInput] = useState('오전 12:00');
	const [timeError, setTimeError] = useState(false);

	const handleToggle = () => {
		setToggleState((prev) => !prev);
	};

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setTimeInput(inputValue);
	};

	const handleTimeBlur = () => {
		const parsedTime = getParsedTime(timeInput);

		if (parsedTime.isSuccess) {
			setTimeError(false);
		} else {
			setTimeError(true);
		}
	};

	return (
		<Flex justify='space-between'>
			<S.DatePickerButton onClick={open}>{selectedDate}</S.DatePickerButton>
			<S.CalendarContainer ref={ref} isOpen={isOpen}>
				{toggleState && (
					<S.TimeInput
						type='text'
						value={timeInput}
						onChange={handleTimeChange}
						onBlur={handleTimeBlur}
						placeholder='오전 12:00'
						isError={timeError}
					/>
				)}
				<S.CalendarHeader>
					<IconButton
						ariaLabel='prevMonth'
						icon='ChevronLeft'
						onClick={prevMonth}
						disabled={isPrevDisabled}
					/>
					<S.Month>
						{current.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
					</S.Month>
					<IconButton
						ariaLabel='nextMonth'
						icon='ChevronRight'
						onClick={nextMonth}
						disabled={isNextDisabled}
					/>
				</S.CalendarHeader>
				<S.WeeksWrapper>
					{WEEKDAYS.map((day) => (
						<S.Cell key={day}>{day}</S.Cell>
					))}
					{dateCells.map((date, idx) => {
						if (!date) {
							// eslint-disable-next-line react/no-array-index-key
							return <S.EmptyCell key={`empty-${idx}`} />;
						}

						const dateString = formatDate(date);
						const isDisabled = DateManager.isPast(date) || DateManager.isAfter(date, oneYearLimit);
						const isSelected = selectedDate === dateString;

						return (
							<S.DateCell
								key={dateString}
								isDisabled={isDisabled}
								isSelected={isSelected}
								onClick={() => onDateChange(dateString)}>
								{date.getDate()}
							</S.DateCell>
						);
					})}
				</S.WeeksWrapper>
				<S.TimeToggleWrapper>
					<Text size='md' weight='regular' color='tertiary'>
						시간 포함
					</Text>
					<Toggle state={toggleState} onToggle={handleToggle} />
				</S.TimeToggleWrapper>
			</S.CalendarContainer>
		</Flex>
	);
};

export default DatePicker;
