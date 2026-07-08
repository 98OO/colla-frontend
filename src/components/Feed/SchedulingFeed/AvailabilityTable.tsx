import TimeColumn from '@components/Feed/SchedulingFeed/TimeColumn';
import { getSlotColor } from '@utils/schedulingUtils';
import type { TotalAvailability } from '@type/feed';
import * as S from './SchedulingFeed.styled';

interface AvailabilityTableProps {
	minTimeSegment: number;
	maxTimeSegment: number;
	totalAvailability: TotalAvailability;
	numOfParticipants: number;
}

const AvailabilityTable = ({
	minTimeSegment,
	maxTimeSegment,
	totalAvailability,
	numOfParticipants,
}: AvailabilityTableProps) => {
	const columnData = Object.entries(totalAvailability);

	return (
		<S.TableContainer>
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
		</S.TableContainer>
	);
};

export default AvailabilityTable;
