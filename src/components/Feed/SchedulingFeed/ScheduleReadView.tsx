import { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import AvailabilityGrid from '@components/Feed/SchedulingFeed/AvailabilityGrid';
import Participants from '@components/Feed/SchedulingFeed/Participants';
import type { AvailabilityColumn, SchedulingResponse, SlotData } from '@type/feed';

interface ScheduleReadViewProps {
	availabilityColumns: AvailabilityColumn[];
	minTimeSegment: number;
	maxTimeSegment: number;
	numOfParticipants: number;
	responses: SchedulingResponse[];
	isParticipating: boolean;
	isClosed: boolean;
	onEdit: () => void;
}

const ScheduleReadView = ({
	availabilityColumns,
	minTimeSegment,
	maxTimeSegment,
	numOfParticipants,
	isParticipating,
	responses,
	isClosed,
	onEdit,
}: ScheduleReadViewProps) => {
	const [currentSlot, setCurrentSlot] = useState<SlotData | null>(null);

	return (
		<>
			<AvailabilityGrid
				minTimeSegment={minTimeSegment}
				maxTimeSegment={maxTimeSegment}
				availabilityColumns={availabilityColumns}
				numOfParticipants={numOfParticipants}
				onCurrentSlotChange={setCurrentSlot}
			/>
			<Flex justify='space-between'>
				<Participants
					responses={responses}
					numOfParticipants={numOfParticipants}
					currentSlot={currentSlot}
				/>
				<Button
					label={isParticipating ? '일정 변경' : '일정 추가'}
					variant='primary'
					size='md'
					disabled={isClosed}
					onClick={onEdit}
				/>
			</Flex>
		</>
	);
};

export default ScheduleReadView;
