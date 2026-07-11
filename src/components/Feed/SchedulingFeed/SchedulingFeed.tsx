import { useState } from 'react';
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
	getUserScheduleInfo,
	toUserAvailability,
} from '@utils/feed/scheduling/availability';
import { excludePastSlots, isDuePassed } from '@utils/feed/scheduling/past';
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

	const { isParticipating, initialSelectedSlots } = getUserScheduleInfo(
		responses,
		userId,
		minTimeSegment,
		maxTimeSegment
	);

	const availabilityColumns = getAvailabilityColumnsInRange(
		totalAvailability,
		minTimeSegment,
		maxTimeSegment
	);
	const dates = availabilityColumns.map(([date]) => date);

	const [isEditable, setIsEditable] = useState(false);

	const handleAddSchedule = () => setIsEditable(true);
	const handleCancelEdit = () => setIsEditable(false);

	const handleSubmit = (selectedSlots: Set<string>) => {
		if (!teamspaceId) return;

		const validSlots = excludePastSlots(selectedSlots);
		const userAvailabilities = toUserAvailability(validSlots, dates);

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
									label={isParticipating ? '일정 변경' : '일정 추가'}
									variant='primary'
									size='md'
									disabled={details.isClosed || isDuePassed(details.dueAt)}
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
