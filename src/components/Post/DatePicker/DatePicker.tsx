import { useEffect, useState } from 'react';
import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';
import Toggle from '@components/common/Toggle/Toggle';
import useOutsideClick from '@hooks/common/useOutSideClick';
import { useOverlay } from '@hooks/common/useOverlay';
import useCalendar from '@hooks/post/useCalendar';
import { CalendarProps } from '@type/post';
import getParsedTime from '@utils/getParsedTime';
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

	const [toggleState, setToggleState] = useState(false);
	const [pickedDay, setPickedDay] = useState(getFormattedDay(selectedDays[0]));
	const [timeInput, setTimeInput] = useState('오전 12:00');
	const [timeError, setTimeError] = useState(false);

	const handleToggle = () => {
		setToggleState((prev) => !prev);
	};

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setTimeInput(inputValue);
	};

	const handleSelectedDayTime = (hour: number = 0, minute: number = 0) => {
		const { year, month, day } = selectedDays[0];
		const timeIncludedDay = { year, month, day, hour, minute };

		toggleDaySelection(timeIncludedDay);
	};

	const handleTimeBlur = () => {
		const parsedTime = getParsedTime(timeInput);

		if (parsedTime.isSuccess) {
			const hour = parsedTime.data?.hours;
			const minutes = parsedTime.data?.minutes;

			handleSelectedDayTime(hour, minutes);
			setTimeError(false);
		} else {
			setTimeError(true);
		}
	};

	useEffect(() => {
		setPickedDay(getFormattedDay(selectedDays[0], toggleState));
	}, [selectedDays, toggleState]);

	useEffect(() => {
		if (!toggleState) {
			handleSelectedDayTime();
		}
	}, [toggleState]);

	return (
		<Flex justify='space-between'>
			<S.DatePickerButton onClick={open}>{pickedDay}</S.DatePickerButton>
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
