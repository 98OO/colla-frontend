import { useEffect, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import BaseFeed from '@components/Feed/BaseFeed/BaseFeed';
import SchedulingDetail from '@components/Feed/Detail/Scheduling/SchedulingDetail';
import TableHeader from '@components/Feed/SchedulingFeed/TableHeader';
import useSchedulingAvailMutation from '@hooks/queries/post/useSchedulingAvailMutation';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import {
	convertTimeString,
	getAvailabilityInRange,
	prepareAvailabilities,
} from '@utils/schedulingUtils';
import type { SchedulingFeed } from '@type/feed';
import * as S from './SchedulingFeed.styled';

interface SchedulingFeedProps {
	feedData: SchedulingFeed;
	isDetailOpen: boolean;
	openDetail: () => void;
	closeDetail: () => void;
}

const SchedulingFeed = ({
	feedData,
	isDetailOpen,
	openDetail,
	closeDetail,
}: SchedulingFeedProps) => {
	const { feedId, details } = feedData;
	const { minTimeSegment, maxTimeSegment, totalAvailability } = details;
	const { userStatus } = useUserStatusQuery();
	const teamspaceId = userStatus?.profile.lastSeenTeamspaceId;

	const rowCount = maxTimeSegment - minTimeSegment;

	const [dragging, setDragging] = useState(false);
	const [selectedSlots, setSelectedSlots] = useState<Set<string>>(() => {
		const initialSelectedSlots = new Set<string>();
		Object.entries(totalAvailability).forEach(([date, segments]) => {
			segments.forEach((value, index) => {
				if (value > 0) {
					initialSelectedSlots.add(`${date}:${index}`);
				}
			});
		});
		return initialSelectedSlots;
	});

	useEffect(() => {
		const initialSelectedSlots = new Set<string>();
		Object.entries(totalAvailability).forEach(([date, segments]) => {
			segments.forEach((value, index) => {
				if (value > 0) {
					initialSelectedSlots.add(`${date}:${index}`);
				}
			});
		});
		setSelectedSlots(initialSelectedSlots);
	}, [totalAvailability]);

	const toggleSlotSelection = (slotId: string) => {
		setSelectedSlots((prev) => {
			const updated = new Set(prev);
			if (updated.has(slotId)) {
				updated.delete(slotId);
			} else {
				updated.add(slotId);
			}
			return updated;
		});
	};

	const [isEditable, setIsEditable] = useState(false);
	const { mutateSchedulingAvail } = useSchedulingAvailMutation();

	const handleAddSchedule = () => setIsEditable(true);
	const handleCancelEdit = () => setIsEditable(false);

	const handleMouseDown = (slotId: string) => {
		if (isEditable) {
			setDragging(true);
			toggleSlotSelection(slotId);
		}
	};

	const handleMouseEnter = (slotId: string) => {
		if (dragging && isEditable) {
			toggleSlotSelection(slotId);
		}
	};

	const handleMouseUp = () => {
		if (isEditable) {
			setDragging(false);
		}
	};

	const isSelected = (slotId: string) => selectedSlots.has(slotId);

	const availability = getAvailabilityInRange(
		totalAvailability,
		minTimeSegment,
		maxTimeSegment
	);
	const columnData = Object.entries(availability);

	const handleSubmit = async () => {
		const availabilites = prepareAvailabilities(selectedSlots, minTimeSegment);

		if (!teamspaceId) return;

		mutateSchedulingAvail(teamspaceId, feedId, availabilites);
		setIsEditable(false);
	};

	const renderTable = () => {
		return (
			<S.TableContainer onMouseLeave={() => setDragging(false)}>
				<S.TimeColumn>
					{Array.from({ length: rowCount / 2 }).map((_, idx) => (
						<S.TimeGroup>
							<S.TimeSlot>{`${convertTimeString(minTimeSegment + idx)}`}</S.TimeSlot>
							<S.TimeSlot />
						</S.TimeGroup>
					))}
				</S.TimeColumn>
				<S.Table>
					{columnData.map(([date, availArray]) => (
						<S.Column key={`column-${date}`}>
							{Array.from({ length: availArray.length / 2 }).map((_, idx) => {
								const slotId = `${date}-${idx}`;

								return (
									<S.SlotGroup key={slotId}>
										<S.Slot
											key={`${slotId}-1`}
											onMouseDown={() => handleMouseDown(`${date}:${idx * 2}`)}
											onMouseEnter={() =>
												handleMouseEnter(`${date}:${idx * 2}`)
											}
											onMouseUp={handleMouseUp}
											isSelected={isSelected(`${date}:${idx * 2}`)}
										/>
										<S.Slot
											key={`${slotId}-2`}
											onMouseDown={() =>
												handleMouseDown(`${date}:${idx * 2 + 1}`)
											}
											onMouseEnter={() =>
												handleMouseEnter(`${date}:${idx * 2 + 1}`)
											}
											onMouseUp={handleMouseUp}
											isSelected={isSelected(`${date}:${idx * 2 + 1}`)}
										/>
									</S.SlotGroup>
								);
							})}
						</S.Column>
					))}
				</S.Table>
			</S.TableContainer>
		);
	};

	return (
		<BaseFeed
			feedData={feedData}
			isDetailOpen={isDetailOpen}
			openDetail={openDetail}
			closeDetail={closeDetail}
			renderDetail={() => <SchedulingDetail feedData={feedData} />}>
			{details && (
				<S.DetailWrapper>
					<TableHeader columnData={columnData} />
					{renderTable()}
					<Flex justify='space-between'>
						<S.ParticipantsContainer>
							<S.Participants>{`일정 작성 인원 (${details.numOfParticipants})`}</S.Participants>
							{details.numOfParticipants === 0 && (
								<Text size='md' weight='medium' color='tertiary'>
									가능한 일정을 작성해주세요
								</Text>
							)}
							{details.numOfParticipants !== 0 && <Flex gap='6'>avatar</Flex>}
						</S.ParticipantsContainer>
						{!isEditable && (
							<Button
								label='일정 추가'
								variant='primary'
								size='md'
								onClick={handleAddSchedule}
							/>
						)}
						{isEditable && (
							<Flex gap='16'>
								<Button
									label='취소'
									variant='secondary'
									size='md'
									onClick={handleCancelEdit}
								/>
								<Button
									label='등록'
									variant='primary'
									size='md'
									onClick={handleSubmit}
								/>
							</Flex>
						)}
					</Flex>
				</S.DetailWrapper>
			)}
		</BaseFeed>
	);
};

export default SchedulingFeed;
