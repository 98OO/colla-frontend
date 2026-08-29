import type { Dispatch, SetStateAction } from 'react';
import { ReactComponent as ChevronLeftIcon } from '@assets/svg/chevron-left.svg';
import { ReactComponent as ChevronRightIcon } from '@assets/svg/chevron-right.svg';
import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import { DateCell, EmptyCell } from '@components/Post/SchedulingPost/Calendar/DateCell/DateCell';
import { useCalendar } from '@hooks/common/calendar/useCalendar';
import useDateSelection from '@hooks/post/scheduling/useDateSelection';
import { formatDate } from '@utils/calendar/formatDate';
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
	const { handlePointerDown, handlePointerEnter, handlePointerUp } =
		useDateSelection(setSelectedDates);

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
					icon={ChevronLeftIcon}
					onClick={prevMonth}
					disabled={isSameMonth}
				/>
				<S.CalendarGrid>
					{WEEKDAYS.map((day) => (
						<S.WeekDaysWrapper key={day}>{day}</S.WeekDaysWrapper>
					))}
					{dateCells.map((date, idx) => {
						// eslint-disable-next-line react/no-array-index-key
						if (!date) return <EmptyCell key={`EmptyCell-${idx}`} />;

						const dateString = formatDate(date);

						return (
							<DateCell
								key={date.toISOString()}
								date={date.getDate()}
								dateString={dateString}
								isPast={DateManager.isPastDate(date)}
								isToday={DateManager.isToday(date)}
								isSelected={selectedDates.has(dateString)}
								onPointerDown={handlePointerDown}
								onPointerEnter={handlePointerEnter}
								onPointerUp={handlePointerUp}
							/>
						);
					})}
				</S.CalendarGrid>
				<IconButton ariaLabel='nextMonth' icon={ChevronRightIcon} onClick={nextMonth} />
			</Flex>
		</S.CalendarContainer>
	);
};

export default Calendar;
