import TimeColumn from '@components/Feed/SchedulingFeed/TimeColumn';
import { makeSlotId } from '@utils/feed/scheduling/schedulingUtils';
import { getSlotColor } from '@utils/schedulingUtils';
import type { AvailabilityColumn } from '@type/feed';
import * as S from './SchedulingFeed.styled';

interface AvailabilityGridProps {
	minTimeSegment: number;
	maxTimeSegment: number;
	availabilityColumns: AvailabilityColumn[];
	numOfParticipants: number;
}

const AvailabilityGrid = ({
	minTimeSegment,
	maxTimeSegment,
	availabilityColumns,
	numOfParticipants,
}: AvailabilityGridProps) => {
	return (
		<S.GridContainer>
			<TimeColumn minTimeSegment={minTimeSegment} maxTimeSegment={maxTimeSegment} />
			<S.Grid>
				{availabilityColumns.map(([date, segments]) => (
					<S.Column key={date}>
						{segments.map((count, idx) => {
							const slotId = makeSlotId(date, idx, minTimeSegment);

							return (
								<S.AvailabilitySlot
									key={slotId}
									slotColor={getSlotColor(numOfParticipants, count)}
								/>
							);
						})}
					</S.Column>
				))}
			</S.Grid>
		</S.GridContainer>
	);
};

export default AvailabilityGrid;
