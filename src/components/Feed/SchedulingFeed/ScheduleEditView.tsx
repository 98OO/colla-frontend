import type { ReactNode } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import TimeColumn from '@components/Feed/SchedulingFeed/TimeColumn';
import useScheduleSelection from '@hooks/feed/useScheduleSelection';
import type { AvailabilityColumn } from '@type/feed';
import * as S from './SchedulingFeed.styled';

interface ScheduleEditViewProps {
	availabilityColumns: AvailabilityColumn[];
	minTimeSegment: number;
	maxTimeSegment: number;
	initialSlots: Set<string>;
	participantsSlot: ReactNode;
	onSubmit: (selectedSlots: Set<string>) => void;
	onCancel: () => void;
}

const ScheduleEditView = ({
	availabilityColumns,
	minTimeSegment,
	maxTimeSegment,
	initialSlots,
	participantsSlot,
	onSubmit,
	onCancel,
}: ScheduleEditViewProps) => {
	const {
		gridRef,
		selectedSlots,
		isSelected,
		commitSelection,
		handlePointerDown,
		handlePointerMove,
	} = useScheduleSelection(initialSlots);

	return (
		<>
			<S.GridContainer>
				<TimeColumn minTimeSegment={minTimeSegment} maxTimeSegment={maxTimeSegment} />
				<S.Grid
					ref={gridRef}
					onPointerDown={handlePointerDown}
					onPointerMove={handlePointerMove}
					onPointerUp={commitSelection}
					onPointerLeave={commitSelection}
					onPointerCancel={commitSelection}
					onLostPointerCapture={commitSelection}>
					{availabilityColumns.map(([date, segments]) => (
						<S.Column key={`column-${date}`}>
							{segments.map((_, idx) => {
								const slotId = `${date}:${idx}`;

								return (
									<S.Slot
										key={slotId}
										data-slot-id={slotId}
										className={isSelected(slotId) ? 'selected' : ''}
									/>
								);
							})}
						</S.Column>
					))}
				</S.Grid>
			</S.GridContainer>
			<Flex justify='space-between'>
				{participantsSlot}
				<Flex gap='16'>
					<Button label='취소' variant='secondary' size='md' onClick={onCancel} />
					<Button
						label='등록'
						variant='primary'
						size='md'
						onClick={() => onSubmit(selectedSlots)}
					/>
				</Flex>
			</Flex>
		</>
	);
};

export default ScheduleEditView;
