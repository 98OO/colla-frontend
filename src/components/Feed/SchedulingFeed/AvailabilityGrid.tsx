import TimeColumn from '@components/Feed/SchedulingFeed/TimeColumn';
import { getSlotColor } from '@utils/feed/scheduling/slotColor';
import { makeSlotId } from '@utils/feed/scheduling/slotId';
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
						{segments.map((availableCount, idx) => {
							const segment = idx + minTimeSegment;
							const slotId = makeSlotId(date, segment);

							return (
								<S.AvailabilitySlot
									key={slotId}
									slotColor={getSlotColor(numOfParticipants, availableCount)}
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
