import { useState, useMemo } from 'react';
import Avatar from '@components/common/Avatar/Avatar';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import BaseFeed from '@components/Feed/BaseFeed/BaseFeed';
import SchedulingDetail from '@components/Feed/Detail/Scheduling/SchedulingDetail';
import AvailabilityGrid from '@components/Feed/SchedulingFeed/AvailabilityGrid';
import GridHeader from '@components/Feed/SchedulingFeed/GridHeader';
import ScheduleEditView from '@components/Feed/SchedulingFeed/ScheduleEditView';
import useSchedulingAvailMutation from '@hooks/queries/post/useSchedulingAvailMutation';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import {
	getAvailabilityColumnsInRange,
	makeSlotId,
	toUserAvailability,
} from '@utils/feed/scheduling/schedulingUtils';
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
	const { minTimeSegment, maxTimeSegment, totalAvailability, responses, numOfParticipants } =
		details;

	const { userStatus } = useUserStatusQuery();
	const teamspaceId = userStatus?.profile.lastSeenTeamspaceId;
	const userId = userStatus?.profile.userId;

	const { mutateSchedulingAvail } = useSchedulingAvailMutation(teamspaceId);

	const [isEditable, setIsEditable] = useState(false);
	const userResponse = responses.find((response) => response.user.id === userId);
	const hasExistingResponse = Boolean(userResponse);

	const initialSelectedSlots = useMemo(() => {
		if (!userResponse) return new Set<string>();

		const slots = new Set<string>();
		Object.entries(userResponse.availabilities).forEach(([date, segments]) => {
			segments.forEach((value, segment) => {
				if (value === 1) {
					const slotId = makeSlotId(date, segment);
					slots.add(slotId);
				}
			});
		});
		return slots;
	}, [userResponse]);

	const handleAddSchedule = () => setIsEditable(true);
	const handleCancelEdit = () => setIsEditable(false);

	const availabilityColumns = getAvailabilityColumnsInRange(
		totalAvailability,
		minTimeSegment,
		maxTimeSegment
	);
	const dates = availabilityColumns.map(([date]) => date);

	const handleSubmit = (selectedSlots: Set<string>) => {
		if (!teamspaceId) return;

		const userAvailabilities = toUserAvailability(selectedSlots, dates);
		mutateSchedulingAvail(feedId, userAvailabilities);
		setIsEditable(false);
	};

	const participantsSlot = (
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
							<Avatar profile={profileImageUrl} initial={username} size='mlg' shape='circle' />
						);
					})}
				</Flex>
			)}
		</S.ParticipantsContainer>
	);

	return (
		<BaseFeed
			feedData={feedData}
			isDetailOpen={isDetailOpen}
			openDetail={openDetail}
			closeDetail={closeDetail}
			renderDetail={() => <SchedulingDetail feedData={feedData} />}>
			{details && (
				<S.DetailWrapper>
					<GridHeader dates={dates} />
					{isEditable ? (
						<ScheduleEditView
							availabilityColumns={availabilityColumns}
							minTimeSegment={minTimeSegment}
							maxTimeSegment={maxTimeSegment}
							initialSlots={initialSelectedSlots}
							participantsSlot={participantsSlot}
							onSubmit={handleSubmit}
							onCancel={handleCancelEdit}
						/>
					) : (
						<>
							<AvailabilityGrid
								minTimeSegment={minTimeSegment}
								maxTimeSegment={maxTimeSegment}
								availabilityColumns={availabilityColumns}
								numOfParticipants={numOfParticipants}
							/>
							<Flex justify='space-between'>
								{participantsSlot}
								<Button
									label={hasExistingResponse ? '일정 변경' : '일정 추가'}
									variant='primary'
									size='md'
									disabled={details.isClosed}
									onClick={handleAddSchedule}
								/>
							</Flex>
						</>
					)}
				</S.DetailWrapper>
			)}
		</BaseFeed>
	);
};

export default SchedulingFeed;
