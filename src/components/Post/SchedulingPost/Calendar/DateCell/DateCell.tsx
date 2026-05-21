import { DateManager } from '@utils/common/DateManager';
import * as S from './DateCell.styled';

interface DateCellProps {
	date: Date | null;
}

const DateCell = ({ date }: DateCellProps) => {
	if (!date) return <S.EmptyCellWrapper />;

	return (
		<S.DateCellWrapper isPast={DateManager.isPast(date)} isToday={DateManager.isToday(date)}>
			{date.getDate()}
		</S.DateCellWrapper>
	);
};

export default DateCell;
