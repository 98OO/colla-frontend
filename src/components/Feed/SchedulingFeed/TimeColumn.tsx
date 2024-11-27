import { convertTimeString } from '@utils/schedulingUtils';
import * as S from './SchedulingFeed.styled';

interface TimeColumnProps {
	minTimeSegment: number;
	maxTimeSegment: number;
}

const TimeColumn = ({ minTimeSegment, maxTimeSegment }: TimeColumnProps) => {
	const rowCount = maxTimeSegment - minTimeSegment;

	return (
		<S.TimeColumn>
			{Array.from({ length: rowCount / 2 }).map((_, idx) => (
				<S.TimeGroup>
					<S.TimeSlot>{`${convertTimeString(minTimeSegment + idx)}`}</S.TimeSlot>
					<S.TimeSlot />
				</S.TimeGroup>
			))}
		</S.TimeColumn>
	);
};

export default TimeColumn;
