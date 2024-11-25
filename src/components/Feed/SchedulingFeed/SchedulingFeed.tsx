import { useEffect, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import BaseFeed from '@components/Feed/BaseFeed/BaseFeed';
import SchedulingDetail from '@components/Feed/Detail/Scheduling/SchedulingDetail';
import useSchedulingAvailMutation from '@hooks/queries/post/useSchedulingAvailMutation';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
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

	const convertTimeString = (num: number) => {
		let hour = (num % 24) % 12;
		if (hour === 0) {
			hour = 12;
		}

		const period = num < 24 ? 'AM' : 'PM';

		return `${hour} ${period}`;
	};

	const getAvailabilityInRange = (total: Record<string, number[]>) => {
		const entries = Object.entries(total);

		return entries.reduce(
			(acc, [date, array]) => {
				acc[date] = array.slice(minTimeSegment, maxTimeSegment);
				return acc;
			},
			{} as Record<string, number[]>
		);
	};

	const getDayAndDate = (dateString: string) => {
		const date = new Date(dateString);
		const dayOfWeek = format(date, 'EEEEEE', { locale: ko });
		const dayOfMonth = format(date, 'd');

		return { dayOfWeek, dayOfMonth };
	};

	const availability = getAvailabilityInRange(totalAvailability);
	const columnData = Object.entries(availability);

	const prepareAvailabilities = () => {
		const availabilities: Record<string, number[]> = {};

		selectedSlots.forEach((slotId) => {
			const [date, index] = slotId.split(':');
			const timeIndex = parseInt(index, 10) + minTimeSegment;

			const isoDate = format(new Date(date), 'yyyy-MM-dd');

			if (!availabilities[isoDate]) {
				availabilities[isoDate] = Array(48).fill(0);
			}

			availabilities[isoDate][timeIndex] = 1;
		});

		return availabilities;
	};

	const handleSubmit = async () => {
		const availabilites = prepareAvailabilities();

		if (!teamspaceId) return;

		mutateSchedulingAvail(teamspaceId, feedId, availabilites);
		setIsEditable(false);
	};

	const renderHeader = () => {
		return (
			<S.HeaderContainer>
				<S.TimeHeader />
				<S.HeaderWrapper>
					{columnData.map(([date]) => {
						const { dayOfWeek, dayOfMonth } = getDayAndDate(date);

						return (
							<S.Header key={`header-${date}`}>
								<S.DayOfWeek>{dayOfWeek}</S.DayOfWeek>
								<S.DayOfMonth>{dayOfMonth}</S.DayOfMonth>
							</S.Header>
						);
					})}
				</S.HeaderWrapper>
			</S.HeaderContainer>
		);
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
					{renderHeader()}
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
