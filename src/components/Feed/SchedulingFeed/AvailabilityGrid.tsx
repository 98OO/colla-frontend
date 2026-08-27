import { memo, useRef, type CSSProperties, type MouseEvent } from 'react';
import TimeColumn from '@components/Feed/SchedulingFeed/TimeColumn';
import { toAvailabilityGradient } from '@utils/feed/scheduling/availabilityGradient';
import { SEGMENTS_PER_HOUR } from '@utils/feed/scheduling/segment';
import { SCHEDULING_SLOT_HEIGHT } from '@constants/feed';
import type { AvailabilityColumn, SlotData } from '@type/feed';
import styles from './AvailabilityGrid.module.css';
import * as S from './SchedulingFeed.styled';

interface AvailabilityGridProps {
	minTimeSegment: number;
	maxTimeSegment: number;
	availabilityColumns: AvailabilityColumn[];
	numOfParticipants: number;
	onCurrentSlotChange: (slot: SlotData | null) => void;
}

const getColumnStyle = (segments: number[], numOfParticipants: number): CSSProperties => ({
	height: segments.length * SCHEDULING_SLOT_HEIGHT,
	backgroundImage: toAvailabilityGradient(segments, numOfParticipants, SCHEDULING_SLOT_HEIGHT),
});

const AvailabilityGrid = memo(
	({
		minTimeSegment,
		maxTimeSegment,
		availabilityColumns,
		numOfParticipants,
		onCurrentSlotChange,
	}: AvailabilityGridProps) => {
		const currentSlotKeyRef = useRef<string | null>(null);

		const dayCount = availabilityColumns.length;
		const startsOnTheHour = minTimeSegment % SEGMENTS_PER_HOUR === 0;

		const handleMouseMove = (e: MouseEvent<HTMLDivElement>, date: string) => {
			const segmentIndex = Math.floor(e.nativeEvent.offsetY / SCHEDULING_SLOT_HEIGHT);
			const slot: SlotData = {
				date,
				segment: minTimeSegment + segmentIndex,
			};

			const slotKey = `${slot.date}:${slot.segment}`;
			if (slotKey === currentSlotKeyRef.current) return;

			currentSlotKeyRef.current = slotKey;
			onCurrentSlotChange(slot);
		};

		const handleMouseLeave = () => {
			currentSlotKeyRef.current = null;
			onCurrentSlotChange(null);
		};

		return (
			<S.GridContainer>
				<TimeColumn minTimeSegment={minTimeSegment} maxTimeSegment={maxTimeSegment} />
				<S.Grid $dayCount={dayCount} onMouseLeave={handleMouseLeave}>
					{availabilityColumns.map((availabilityColumn) => {
						const [date, segments] = availabilityColumn;

						return (
							<div
								key={date}
								className={styles.column}
								data-starts-on-the-hour={startsOnTheHour}
								onMouseMove={(e) => handleMouseMove(e, date)}
								style={getColumnStyle(segments, numOfParticipants)}
							/>
						);
					})}
				</S.Grid>
			</S.GridContainer>
		);
	}
);

export default AvailabilityGrid;
