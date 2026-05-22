import { getDateCellState } from '@utils/calendar/getDateCellState';
import type { DateString } from '@type/post';
import * as S from './DateCell.styled';

interface DateCellProps {
	date: Date | null;
	selectedDates: Set<DateString>;
	onPointerDown: (date: Date) => void;
	onPointerMove: (date: Date) => void;
	onPointerUp: () => void;
}

const DateCell = ({
	date,
	selectedDates,
	onPointerDown,
	onPointerMove,
	onPointerUp,
}: DateCellProps) => {
	if (!date) return <S.EmptyCellWrapper />;

	const { isPast, isToday, isSelected } = getDateCellState(date, selectedDates);

	return (
		<S.DateCellWrapper
			$isPast={isPast}
			$isToday={isToday}
			$isSelected={isSelected}
			onPointerDown={() => onPointerDown(date)}
			onPointerMove={() => onPointerMove(date)}
			onPointerUp={onPointerUp}>
			{date.getDate()}
		</S.DateCellWrapper>
	);
};

export default DateCell;
