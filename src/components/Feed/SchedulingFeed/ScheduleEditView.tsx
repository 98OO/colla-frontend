import type { ReactNode } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import TimeColumn from '@components/Feed/SchedulingFeed/TimeColumn';
import useScheduleSelection from '@hooks/feed/useScheduleSelection';
import * as S from './SchedulingFeed.styled';

interface ScheduleEditViewProps {
	columnData: [string, number[]][];
	minTimeSegment: number;
	maxTimeSegment: number;
	initialSlots: Set<string>;
	participantsSlot: ReactNode;
	onSubmit: (selectedSlots: Set<string>) => void;
	onCancel: () => void;
}

const ScheduleEditView = ({
	columnData,
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
			<S.TableContainer>
				<TimeColumn minTimeSegment={minTimeSegment} maxTimeSegment={maxTimeSegment} />
				<S.Grid
					ref={gridRef}
					onPointerDown={handlePointerDown}
					onPointerMove={handlePointerMove}
					onPointerUp={commitSelection}
					onPointerLeave={commitSelection}
					onPointerCancel={commitSelection}
					onLostPointerCapture={commitSelection}>
					{columnData.map(([date, availArray]) => (
						<S.Column key={`column-${date}`}>
							{Array.from({ length: availArray.length / 2 }).map((_, idx) => {
								const slotGroupId = `${date}:${idx}`;
								const firstSlotId = `${date}:${idx * 2}`;
								const secondSlotId = `${date}:${idx * 2 + 1}`;

								return (
									<S.SlotGroup key={slotGroupId}>
										<S.Slot
											data-slot-id={firstSlotId}
											className={isSelected(firstSlotId) ? 'selected' : ''}
										/>
										<S.Slot
											data-slot-id={secondSlotId}
											className={isSelected(secondSlotId) ? 'selected' : ''}
										/>
									</S.SlotGroup>
								);
							})}
						</S.Column>
					))}
				</S.Grid>
			</S.TableContainer>
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
