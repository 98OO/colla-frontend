import { memo, type MouseEvent } from 'react';
import TimeColumn from '@components/Feed/SchedulingFeed/TimeColumn';
import { getSlotColor } from '@utils/feed/scheduling/slotColor';
import { makeSlotId, parseSlotId } from '@utils/feed/scheduling/slotId';
import type { AvailabilityColumn, SlotData } from '@type/feed';
import * as S from './SchedulingFeed.styled';

interface AvailabilityGridProps {
	minTimeSegment: number;
	maxTimeSegment: number;
	availabilityColumns: AvailabilityColumn[];
	numOfParticipants: number;
	onCurrentSlotChange: (slot: SlotData | null) => void;
}

const AvailabilityGrid = memo(
	({
		minTimeSegment,
		maxTimeSegment,
		availabilityColumns,
		numOfParticipants,
		onCurrentSlotChange,
	}: AvailabilityGridProps) => {
		const dayCount = availabilityColumns.length;

		const handleGridLeave = () => onCurrentSlotChange(null);

		const handleSlotHover = (e: MouseEvent<HTMLDivElement>) => {
			const { slotId } = (e.target as HTMLElement).dataset;

			onCurrentSlotChange(slotId ? parseSlotId(slotId) : null);
		};

		return (
			<S.GridContainer>
				<TimeColumn minTimeSegment={minTimeSegment} maxTimeSegment={maxTimeSegment} />
				<S.Grid $dayCount={dayCount} onMouseLeave={handleGridLeave} onMouseOver={handleSlotHover}>
					{availabilityColumns.map(([date, segments]) => (
						<S.Column key={date}>
							{segments.map((availableCount, idx) => {
								const segment = idx + minTimeSegment;
								const hasParticipants = availableCount > 0;
								const slotId = makeSlotId(date, segment);
								const slotColor = getSlotColor(numOfParticipants, availableCount);

								return (
									<S.AvailabilitySlot
										key={slotId}
										data-slot-id={hasParticipants ? slotId : null}
										$hasParticipants={hasParticipants}
										$slotColor={slotColor}
									/>
								);
							})}
						</S.Column>
					))}
				</S.Grid>
			</S.GridContainer>
		);
	}
);

export default AvailabilityGrid;
