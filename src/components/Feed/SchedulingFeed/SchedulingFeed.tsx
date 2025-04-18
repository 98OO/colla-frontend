import { useState, useMemo } from 'react';
import Avatar from '@components/common/Avatar/Avatar';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import BaseFeed from '@components/Feed/BaseFeed/BaseFeed';
import SchedulingDetail from '@components/Feed/Detail/Scheduling/SchedulingDetail';
import AvailabilityTable from '@components/Feed/SchedulingFeed/AvailabilityTable';
import TableHeader from '@components/Feed/SchedulingFeed/TableHeader';
import TimeColumn from '@components/Feed/SchedulingFeed/TimeColumn';
import useScheduleSelection from '@hooks/feed/useScheduleSelection';
import useSchedulingAvailMutation from '@hooks/queries/post/useSchedulingAvailMutation';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import {
	getAvailabilityInRange,
	prepareAvailabilities,
	convertAvailabilityToSlots,
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
	const {
		minTimeSegment,
		maxTimeSegment,
		totalAvailability,
		responses,
		numOfParticipants,
	} = details;

	const { userStatus } = useUserStatusQuery();
	const teamspaceId = userStatus?.profile.lastSeenTeamspaceId;
	const userId = userStatus?.profile.userId;

	const { mutateSchedulingAvail } = useSchedulingAvailMutation(teamspaceId);

	const [isEditable, setIsEditable] = useState(false);
	const userResponse = responses.find(
		(response) => response.user.id === userId
	);
	const hasExistingResponse = Boolean(userResponse);

	const initialSelectedSlots = useMemo(() => {
		if (!userResponse) return new Set<string>();

		const slots = new Set<string>();
		Object.entries(userResponse.availabilities).forEach(([date, segments]) => {
			segments.forEach((value, index) => {
				if (value === 1) {
					// minTimeSegment를 빼서 상대적인 인덱스로 변환
					const relativeIndex = index - minTimeSegment;
					slots.add(`${date}:${relativeIndex}`);
				}
			});
		});
		return slots;
	}, [userResponse, minTimeSegment]);

	const handleAddSchedule = () => setIsEditable(true);
	const handleCancelEdit = () => setIsEditable(false);

	const {
		setIsDragging,
		selectedSlots,
		handleMouseDown,
		handleMouseEnter,
		handleMouseUp,
		isSelected,
	} = useScheduleSelection(isEditable, initialSelectedSlots);

	const availabilityInRange = getAvailabilityInRange(
		totalAvailability,
		minTimeSegment,
		maxTimeSegment
	);
	const availabilitySlots = convertAvailabilityToSlots(availabilityInRange);

	const columnData = Object.entries(availabilityInRange);

	const handleMouseLeave = () => {
		setIsDragging(false);
	};

	const handleSubmit = async () => {
		const availabilites = prepareAvailabilities(
			selectedSlots,
			minTimeSegment,
			totalAvailability
		);

		if (!teamspaceId) return;

		mutateSchedulingAvail(teamspaceId, feedId, availabilites);
		setIsEditable(false);
	};

	const renderTable = () => {
		return (
			<S.TableContainer onMouseLeave={handleMouseLeave}>
				<TimeColumn
					minTimeSegment={minTimeSegment}
					maxTimeSegment={maxTimeSegment}
				/>
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
					{isEditable && renderTable()}
					{!isEditable && (
						<AvailabilityTable
							minTimeSegment={minTimeSegment}
							maxTimeSegment={maxTimeSegment}
							availabilitySlots={availabilitySlots}
							numOfParticipants={numOfParticipants}
						/>
					)}
					<Flex justify='space-between'>
						<S.ParticipantsContainer>
							<S.Participants>{`일정 작성 인원 (${numOfParticipants})`}</S.Participants>
							{numOfParticipants === 0 && (
								<Text size='md' weight='medium' color='tertiary'>
									가능한 일정을 작성해주세요
								</Text>
							)}
							{numOfParticipants !== 0 && (
								<Flex gap='6'>
									{responses.map(({ user }) => {
										const { profileImageUrl, username } = user;

										return (
											<Avatar
												profile={profileImageUrl}
												initial={username}
												size='mlg'
												shape='circle'
											/>
										);
									})}
								</Flex>
							)}
						</S.ParticipantsContainer>
						{!isEditable && (
							<Button
								label={hasExistingResponse ? '일정 변경' : '일정 추가'}
								variant='primary'
								size='md'
								disabled={details.isClosed}
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
