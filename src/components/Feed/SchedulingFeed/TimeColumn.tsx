import { convertSegmentToHourLabel, SEGMENTS_PER_HOUR } from '@utils/feed/scheduling/segment';
import * as S from './SchedulingFeed.styled';

interface TimeColumnProps {
	minTimeSegment: number;
	maxTimeSegment: number;
}

const TimeColumn = ({ minTimeSegment, maxTimeSegment }: TimeColumnProps) => {
	const rowCount = maxTimeSegment - minTimeSegment;

	return (
		<S.TimeColumn>
			{Array.from({ length: rowCount }).map((_, idx) => {
				const segment = minTimeSegment + idx;
				const isHourStart = segment % SEGMENTS_PER_HOUR === 0;

				return (
					<S.TimeLabel key={segment}>
						{isHourStart ? convertSegmentToHourLabel(segment) : ''}
					</S.TimeLabel>
				);
			})}
		</S.TimeColumn>
	);
};

export default TimeColumn;
