import { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import BaseFeed from '@components/Feed/BaseFeed/BaseFeed';
import SchedulingDetail from '@components/Feed/Detail/Scheduling/SchedulingDetail';
import TableHeader from '@components/Feed/SchedulingFeed/TableHeader';
import useScheduleSelection from '@hooks/feed/useScheduleSelection';
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
	const rowCount = maxTimeSegment - minTimeSegment;

	const { userStatus } = useUserStatusQuery();
	const teamspaceId = userStatus?.profile.lastSeenTeamspaceId;

	const { mutateSchedulingAvail } = useSchedulingAvailMutation();

	const [isEditable, setIsEditable] = useState(false);

	const handleAddSchedule = () => setIsEditable(true);
	const handleCancelEdit = () => setIsEditable(false);

	const {
		setIsDragging,
		selectedSlots,
		handleMouseDown,
		handleMouseEnter,
		handleMouseUp,
		isSelected,
	} = useScheduleSelection(isEditable);

	const availability = getAvailabilityInRange(
		totalAvailability,
		minTimeSegment,
		maxTimeSegment
	);
	const columnData = Object.entries(availability);

	const handleMouseLeave = () => {
		setIsDragging(false);
	};

	const handleSubmit = async () => {
		const availabilites = prepareAvailabilities(selectedSlots, minTimeSegment);

		if (!teamspaceId) return;

		mutateSchedulingAvail(teamspaceId, feedId, availabilites);
		setIsEditable(false);
	};

	const renderTable = () => {
		return (
			<S.TableContainer onMouseLeave={handleMouseLeave}>
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
								const slotGroupId = `${date}:${idx}`;
								const firstSlotId = `${date}:${idx * 2}`;
								const secondSlotId = `${date}:${idx * 2 + 1}`;

								return (
									<S.SlotGroup key={slotGroupId}>
										<S.Slot
											key={firstSlotId}
											onMouseDown={() => handleMouseDown(firstSlotId)}
											onMouseEnter={() => handleMouseEnter(firstSlotId)}
											onMouseUp={handleMouseUp}
											isSelected={isSelected(firstSlotId)}
										/>
										<S.Slot
											key={secondSlotId}
											onMouseDown={() => handleMouseDown(secondSlotId)}
											onMouseEnter={() => handleMouseEnter(secondSlotId)}
											onMouseUp={handleMouseUp}
											isSelected={isSelected(secondSlotId)}
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
