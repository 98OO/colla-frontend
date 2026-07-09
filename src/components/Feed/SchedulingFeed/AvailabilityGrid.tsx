import TimeColumn from '@components/Feed/SchedulingFeed/TimeColumn';
import { getSlotColor } from '@utils/schedulingUtils';
import type { TotalAvailability } from '@type/feed';
import * as S from './SchedulingFeed.styled';

interface AvailabilityGridProps {
	minTimeSegment: number;
	maxTimeSegment: number;
	totalAvailability: TotalAvailability;
	numOfParticipants: number;
}

const AvailabilityGrid = ({
	minTimeSegment,
	maxTimeSegment,
	totalAvailability,
	numOfParticipants,
}: AvailabilityGridProps) => {
	const columnData = Object.entries(totalAvailability);

	return (
		<S.GridContainer>
			<TimeColumn minTimeSegment={minTimeSegment} maxTimeSegment={maxTimeSegment} />
			<S.Grid>
				{columnData.map(([date, segments]) => (
					<S.Column key={date}>
						{segments.map((count, idx) => {
							const slotId = `${date}:${idx}`;

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
