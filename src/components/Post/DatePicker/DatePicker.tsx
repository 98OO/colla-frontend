import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import Select from '@components/common/Select/Select';
import { useCalendar } from '@hooks/common/calendar/useCalendar';
import useOutsideClick from '@hooks/common/useOutSideClick';
import { useOverlay } from '@hooks/common/useOverlay';
import { formatDate } from '@utils/calendar/formatDate';
import { DateManager } from '@utils/common/DateManager';
import isPastTime from '@utils/post/scheduling/isPastTime';
import { WEEKDAYS } from '@constants/calendar';
import { DEFAULT_TIME_OPTIONS } from '@constants/post';
import type { DateString, TimeString } from '@type/post';
import * as S from './DatePicker.styled';

interface DatePickerProps {
	selectedDate: DateString;
	time: TimeString;
	onDateChange: (date: DateString) => void;
	onTimeChange: (time: TimeString) => void;
}

const DatePicker = ({ selectedDate, time, onDateChange, onTimeChange }: DatePickerProps) => {
	const today = new Date();
	const { current, dateCells, prevMonth, nextMonth } = useCalendar(today);

	const { isOpen, open, close } = useOverlay();
	const ref = useOutsideClick({ onClickOutside: close });

	const oneYearLimit = DateManager.getDateAfter(today, { years: 1 });
	const isPrevDisabled = DateManager.isSameMonth(current, today);
	const isNextDisabled = DateManager.isAfterDate(current, oneYearLimit);

	const getAvailableTimeOptions = (date: DateString) => {
		return DEFAULT_TIME_OPTIONS.filter((option) => !isPastTime(date, option));
	};

	const handleDateSelect = (date: DateString) => {
		onDateChange(date);

		const nextTimeOptions = getAvailableTimeOptions(date);

		// 날짜를 변경했을 때 기존에 고른 시간이 유효하지 않을 경우 첫 유효 옵션으로 보정
		if (!nextTimeOptions.includes(time)) {
			onTimeChange(nextTimeOptions[0]);
		}
	};

	const isDateDisabled = (date: Date) => {
		return (
			DateManager.isPastDate(date) ||
			DateManager.isAfterDate(date, oneYearLimit) ||
			(DateManager.isToday(date) && getAvailableTimeOptions(formatDate(date)).length === 0)
		);
	};

	const timeOptions = getAvailableTimeOptions(selectedDate);

	return (
		<Flex gap='12' align='flex-start'>
			<Flex direction='column' gap='6'>
				<S.DateField ref={ref}>
					<S.DatePickerButton onClick={open}>{selectedDate}</S.DatePickerButton>
					<S.CalendarContainer isOpen={isOpen}>
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
								const isSelected = selectedDate === dateString;
								const isDisabled = isDateDisabled(date);

								return (
									<S.DateCell
										key={dateString}
										isDisabled={isDisabled}
										isSelected={isSelected}
										onClick={() => handleDateSelect(dateString)}>
										{date.getDate()}
									</S.DateCell>
								);
							})}
						</S.WeeksWrapper>
					</S.CalendarContainer>
				</S.DateField>
			</Flex>
			<Flex direction='column' gap='6' width='120'>
				<Select
					size='sm'
					options={timeOptions}
					select={time}
					setSelect={(idx) => onTimeChange(timeOptions[idx - 1])}
				/>
			</Flex>
		</Flex>
	);
};

export default DatePicker;
