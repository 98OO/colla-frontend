import Avatar from '@components/common/Avatar/Avatar';
import Text from '@components/common/Text/Text';
import { getAvailableParticipants } from '@utils/feed/scheduling/availability';
import { convertSegmentToTimeString } from '@utils/feed/scheduling/segment';
import { WEEKDAYS } from '@constants/calendar';
import type { SchedulingResponse, SlotData } from '@type/feed';
import * as S from './SchedulingFeed.styled';

interface ParticipantsProps {
	responses: SchedulingResponse[];
	numOfParticipants: number;
	currentSlot?: SlotData | null;
}

const renderParticipantChip = (user: SchedulingResponse['user']) => (
	<S.ParticipantChip key={user.id}>
		<Avatar profile={user.profileImageUrl} initial={user.username} size='sm' shape='circle' />
		<span>{user.username}</span>
	</S.ParticipantChip>
);

const formatSlotDateTime = (slot: SlotData) => {
	const slotDate = new Date(slot.date);
	const dateString = `${slotDate.getMonth() + 1}.${slotDate.getDate()}(${WEEKDAYS[slotDate.getDay()]})`;
	const timeString = `${convertSegmentToTimeString(slot.segment)} ~ ${convertSegmentToTimeString(slot.segment + 1)}`;

	return `${dateString} ${timeString}`;
};

const Participants = ({ responses, numOfParticipants, currentSlot }: ParticipantsProps) => {
	if (!currentSlot) {
		return (
			<S.ParticipantsContainer>
				<S.Caption>{`일정 작성 인원 (${numOfParticipants})`}</S.Caption>
				{numOfParticipants === 0 ? (
					<Text size='md' weight='medium' color='tertiary'>
						가능한 일정을 작성해주세요
					</Text>
				) : (
					<S.ParticipantWrapper>
						{responses.map(({ user }) => renderParticipantChip(user))}
					</S.ParticipantWrapper>
				)}
			</S.ParticipantsContainer>
		);
	}

	const availableParticipants = getAvailableParticipants(
		responses,
		currentSlot.date,
		currentSlot.segment
	);
	const slotDateTime = formatSlotDateTime(currentSlot);
	const countRatio = `(${availableParticipants.length}/${numOfParticipants})`;

	return (
		<S.ParticipantsContainer>
			<S.Caption>{`${slotDateTime} ${countRatio}`}</S.Caption>
			<S.ParticipantWrapper>
				{availableParticipants.map((user) => renderParticipantChip(user))}
			</S.ParticipantWrapper>
		</S.ParticipantsContainer>
	);
};

export default Participants;
