import { convertSegmentToTimeLabel } from '@utils/feed/scheduling/schedulingUtils';
import * as S from './SchedulingFeed.styled';

interface TimeColumnProps {
	minTimeSegment: number;
	maxTimeSegment: number;
}

const TimeColumn = ({ minTimeSegment, maxTimeSegment }: TimeColumnProps) => {
	const rowCount = maxTimeSegment - minTimeSegment;

	return (
		<S.TimeColumn>
			{Array.from({ length: rowCount / 2 }).map((_, idx) => {
				const segment = minTimeSegment + idx * 2;
				const timeLabel = convertSegmentToTimeLabel(segment);

				return <S.TimeLabel key={segment}>{timeLabel}</S.TimeLabel>;
			})}
		</S.TimeColumn>
	);
};

export default TimeColumn;
