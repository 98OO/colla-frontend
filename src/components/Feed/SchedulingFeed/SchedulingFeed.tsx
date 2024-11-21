import { useEffect, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Drawer from '@components/common/Drawer/Drawer';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';
import SchedulingDetail from '@components/Feed/Detail/Scheduling/SchedulingDetail';
import FeedAuthor from '@components/Feed/FeedAuthors/FeedAuthor';
import useSchedulingAvailMutation from '@hooks/queries/post/useSchedulingAvailMutation';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getFormattedDate } from '@utils/getFormattedDate';
import type { FeedData, SchedulingFeed } from '@type/feed';
import * as S from './SchedulingFeed.styled';

interface ActionButtonProps {
	icon: 'Comment' | 'Attachment';
	count: number;
	onClick: () => void;
	ariaLabel: string;
}

interface FeedProps {
	feedData: SchedulingFeed;
	isDetailOpen: boolean;
	openDetail: () => void;
	closeDetail: () => void;
}

const ActionButton = ({
	icon,
	count,
	onClick,
	ariaLabel,
}: ActionButtonProps) => {
	return (
		<Flex align='center'>
			<IconButton
				icon={icon}
				size='md'
				color='secondary'
				ariaLabel={ariaLabel}
				onClick={onClick}
			/>
			<Text color='secondary' size='md' weight='medium'>
				{count === 0 ? '0' : String(count)}
			</Text>
		</Flex>
	);
};

const CommentPreview = ({ comments }: { comments: FeedData['comments'] }) => {
	if (comments.length === 0) return null;

	const commentsToShow =
		comments.length === 1 ? comments.slice(-1) : comments.slice(-2);
	return (
		<Flex direction='column' gap='8' marginBottom='10'>
			{commentsToShow.map((comment) => (
				<Flex key={comment.id} gap='6'>
					<Text size='md' weight='semiBold'>
						{comment.author.username}
					</Text>
					<Text size='md' weight='regular'>
						{comment.content}
					</Text>
				</Flex>
			))}
		</Flex>
	);
};

const SchedulingFeed = ({
	feedData,
	isDetailOpen,
	openDetail,
	closeDetail,
}: FeedProps) => {
	const { feedId, author, title, createdAt, details, comments } = feedData;
	const { minTimeSegment, maxTimeSegment, totalAvailability } = details;
	const { userStatus } = useUserStatusQuery();
	const teamspaceId = userStatus?.profile.lastSeenTeamspaceId;

	const rowCount = maxTimeSegment - minTimeSegment;

	const [dragging, setDragging] = useState(false);
	const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());

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

	useEffect(() => {
		if (!isEditable) {
			setSelectedSlots(new Set());
		}
	}, [isEditable]);

	return (
		<S.FeedContainer>
			<S.SchedulingContainer>
				<FeedAuthor
					profile={author.profileImageUrl}
					initial={author.username.charAt(0)}
					title={author.username}
					createdAt={getFormattedDate(createdAt, 'feed')}
					tag={author?.tag?.name || ''}
				/>
				<Flex direction='column' gap='12'>
					<Heading size='xs'>{title}</Heading>
					<Divider size='sm' />
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
									{details.numOfParticipants !== 0 && (
										<Flex gap='6'>avatar</Flex>
									)}
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
				</Flex>
				{isDetailOpen && (
					<Drawer isOpen={isDetailOpen} onClose={closeDetail}>
						<SchedulingDetail feedData={feedData} />
					</Drawer>
				)}
			</S.SchedulingContainer>
			<Flex direction='column' paddingRight='24' paddingLeft='24'>
				<Divider size='sm' padding={16} />
			</Flex>
			<Flex direction='row' marginLeft='18' gap='8'>
				<ActionButton
					icon='Comment'
					count={comments.length}
					onClick={openDetail}
					ariaLabel='댓글'
				/>
			</Flex>
			<S.CommentPreviewWrapper>
				<CommentPreview comments={comments} />
			</S.CommentPreviewWrapper>
		</S.FeedContainer>
	);
};

export default SchedulingFeed;
