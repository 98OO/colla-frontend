import GridHeader from '@components/Feed/SchedulingFeed/GridHeader';
import Participants from '@components/Feed/SchedulingFeed/Participants';
import ScheduleEditView from '@components/Feed/SchedulingFeed/ScheduleEditView';
import ScheduleReadView from '@components/Feed/SchedulingFeed/ScheduleReadView';
import useSchedulingEditMode from '@hooks/feed/useSchedulingEditMode';
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

interface SchedulingContentProps {
	feedData: SchedulingFeed;
	onEditChange?: (feedId: number, isEditing: boolean) => void;
}

const SchedulingContent = ({ feedData, onEditChange }: SchedulingContentProps) => {
	const { feedId, details } = feedData;
	const { minTimeSegment, maxTimeSegment, totalAvailability, responses, numOfParticipants } =
		details;

	const { userStatus } = useUserStatusQuery();
	const teamspaceId = userStatus?.profile.lastSeenTeamspaceId;
	const userId = userStatus?.profile.userId;

	const { isEditing, enterEditMode, exitEditMode } = useSchedulingEditMode({
		feedId,
		onEditChange,
	});
	const { mutateSchedulingAvail } = useSchedulingAvailMutation(teamspaceId, exitEditMode);

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

	const handleSubmit = (selectedSlots: Set<string>) => {
		if (!teamspaceId) return;

		const validSlots = excludePastSlots(selectedSlots);
		const userAvailabilities = toUserAvailability(validSlots, dates);

		mutateSchedulingAvail(feedId, userAvailabilities);
	};

	return (
		<S.DetailWrapper>
			<GridHeader dates={dates} />
			{isEditing ? (
				<ScheduleEditView
					availabilityColumns={availabilityColumns}
					minTimeSegment={minTimeSegment}
					maxTimeSegment={maxTimeSegment}
					initialSlots={initialSelectedSlots}
					participantsSlot={
						<Participants responses={responses} numOfParticipants={numOfParticipants} />
					}
					onSubmit={handleSubmit}
					onCancel={exitEditMode}
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
					onEdit={enterEditMode}
				/>
			)}
		</S.DetailWrapper>
	);
};

export default SchedulingContent;
