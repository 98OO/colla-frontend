import TimeColumn from '@components/Feed/SchedulingFeed/TimeColumn';
import { getSlotColor } from '@utils/schedulingUtils';
import * as S from './SchedulingFeed.styled';

interface AvailabilityTableProps {
	minTimeSegment: number;
	maxTimeSegment: number;
	availabilitySlots: Record<string, number[][]>;
	numOfParticipants: number;
}

const AvailabilityTable = ({
	minTimeSegment,
	maxTimeSegment,
	availabilitySlots,
	numOfParticipants,
}: AvailabilityTableProps) => {
	const columnData = Object.entries(availabilitySlots);

	return (
		<S.TableContainer>
			<TimeColumn
				minTimeSegment={minTimeSegment}
				maxTimeSegment={maxTimeSegment}
			/>
			<S.Table>
				{columnData.map(([date, slotGroups]) => (
					<S.Column key={date}>
						{slotGroups.map((slotGroup) => {
							const firstSlotColor = getSlotColor(
								numOfParticipants,
								slotGroup[0]
							);
							const secondSlotColor = getSlotColor(
								numOfParticipants,
								slotGroup[1]
							);

							return (
								<S.SlotGroup>
									<S.AvailabilitySlot slotColor={firstSlotColor} />
									<S.AvailabilitySlot slotColor={secondSlotColor} />
								</S.SlotGroup>
							);
						})}
					</S.Column>
				))}
			</S.Table>
		</S.TableContainer>
	);
};

export default AvailabilityTable;
