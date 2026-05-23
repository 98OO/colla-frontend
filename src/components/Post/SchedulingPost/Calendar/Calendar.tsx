import { useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import { DateCell, EmptyCell } from '@components/Post/SchedulingPost/Calendar/DateCell/DateCell';
import { useCalendar } from '@hooks/common/calendar/useCalendar';
import useDateSelection from '@hooks/post/scheduling/useDateSelection';
import { DateManager } from '@utils/common/DateManager';
import { WEEKDAYS } from '@constants/calendar';
import type { DateString } from '@type/post';
import * as S from './Calendar.styled';

interface CalendarProps {
	selectedDates: Set<DateString>;
	setSelectedDates: Dispatch<SetStateAction<Set<DateString>>>;
}

const Calendar = ({ selectedDates, setSelectedDates }: CalendarProps) => {
	const today = useMemo(() => new Date(), []);

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
					icon='ChevronLeft'
					onClick={prevMonth}
					disabled={isSameMonth}
				/>
				<S.CalendarGrid>
					{WEEKDAYS.map((day) => (
						<S.WeekDaysWrapper key={day}>{day}</S.WeekDaysWrapper>
					))}
					{dateCells.map((cell, idx) => {
						// eslint-disable-next-line react/no-array-index-key
						if (!cell) return <EmptyCell key={`EmptyCell-${idx}`} />;

						const { date, dateString, isPast, isToday } = cell;

						return (
							<DateCell
								key={dateString}
								date={date}
								dateString={dateString}
								isPast={isPast}
								isToday={isToday}
								isSelected={selectedDates.has(dateString)}
								onPointerDown={handlePointerDown}
								onPointerEnter={handlePointerEnter}
								onPointerUp={handlePointerUp}
							/>
						);
					})}
				</S.CalendarGrid>
				<IconButton ariaLabel='nextMonth' icon='ChevronRight' onClick={nextMonth} />
			</Flex>
		</S.CalendarContainer>
	);
};

export default Calendar;
