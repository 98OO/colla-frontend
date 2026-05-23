import { memo } from 'react';
import type { DateString } from '@type/post';
import * as S from './DateCell.styled';

interface DateCellProps {
	date: number;
	dateString: DateString;
	isPast: boolean;
	isToday: boolean;
	isSelected: boolean;
	onPointerDown: (dateString: DateString, isPast: boolean) => void;
	onPointerEnter: (dateString: DateString, isPast: boolean) => void;
	onPointerUp: () => void;
}

export const EmptyCell = memo(() => {
	return <S.EmptyCellWrapper />;
});

export const DateCell = memo(
	({
		date,
		dateString,
		isPast,
		isToday,
		isSelected,
		onPointerDown,
		onPointerEnter,
		onPointerUp,
	}: DateCellProps) => {
		return (
			<S.DateCellWrapper
				$isPast={isPast}
				$isToday={isToday}
				$isSelected={isSelected}
				onPointerDown={() => onPointerDown(dateString, isPast)}
				onPointerEnter={() => onPointerEnter(dateString, isPast)}
				onPointerUp={onPointerUp}>
				{date}
			</S.DateCellWrapper>
		);
	}
);
