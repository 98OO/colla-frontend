import { useState } from 'react';
import BaseFeed from '@components/Feed/BaseFeed/BaseFeed';
import SchedulingDetail from '@components/Feed/Detail/Scheduling/SchedulingDetail';
import GridHeader from '@components/Feed/SchedulingFeed/GridHeader';
import Participants from '@components/Feed/SchedulingFeed/Participants';
import ScheduleEditView from '@components/Feed/SchedulingFeed/ScheduleEditView';
import ScheduleReadView from '@components/Feed/SchedulingFeed/ScheduleReadView';
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

	const [isEditable, setIsEditable] = useState(false);

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
	const isClosed = details.isClosed || isDuePassed(details.dueAt);

	const handleEdit = () => setIsEditable(true);

	const handleCancel = () => setIsEditable(false);

	const handleSubmit = (selectedSlots: Set<string>) => {
		if (!teamspaceId) return;

		const validSlots = excludePastSlots(selectedSlots);
		const userAvailabilities = toUserAvailability(validSlots, dates);

		mutateSchedulingAvail(feedId, userAvailabilities);
		setIsEditable(false);
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
					<GridHeader dates={dates} />
					{isEditable ? (
						<ScheduleEditView
							availabilityColumns={availabilityColumns}
							minTimeSegment={minTimeSegment}
							maxTimeSegment={maxTimeSegment}
							initialSlots={initialSelectedSlots}
							participantsSlot={
								<Participants responses={responses} numOfParticipants={numOfParticipants} />
							}
							onSubmit={handleSubmit}
							onCancel={handleCancel}
						/>
					) : (
						<ScheduleReadView
							availabilityColumns={availabilityColumns}
							minTimeSegment={minTimeSegment}
							maxTimeSegment={maxTimeSegment}
							numOfParticipants={numOfParticipants}
							isParticipating={isParticipating}
							responses={responses}
							isClosed={isClosed}
							onEdit={handleEdit}
						/>
					)}
				</S.DetailWrapper>
			)}
		</BaseFeed>
	);
};

export default SchedulingFeed;
