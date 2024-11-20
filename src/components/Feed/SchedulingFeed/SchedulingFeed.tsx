import Divider from '@components/common/Divider/Divider';
import Drawer from '@components/common/Drawer/Drawer';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';
import SchedulingDetail from '@components/Feed/Detail/Scheduling/SchedulingDetail';
import FeedAuthor from '@components/Feed/FeedAuthors/FeedAuthor';
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
	const { author, title, createdAt, details, comments } = feedData;
	const { minTimeSegment, maxTimeSegment, totalAvailability } = details;

	const rowCount = maxTimeSegment - minTimeSegment;
	const columnData = Object.keys(totalAvailability);

	function convertTimeString(num: number) {
		let hour = (num % 24) % 12;
		if (hour === 0) {
			hour = 12;
		}

		const period = num < 24 ? 'AM' : 'PM';

		return `${hour} ${period}`;
	}

	const renderTable = () => {
		return (
			<S.TableContainer>
				<S.TimeColumn>
					{Array.from({ length: rowCount / 2 }).map((_, idx) => (
						<S.TimeSlot>{`${convertTimeString(minTimeSegment + idx)}`}</S.TimeSlot>
					))}
				</S.TimeColumn>
				{columnData.map((date, cIdx) => (
					<S.Column>
						{Array.from({ length: rowCount / 2 }).map(() => (
							<S.SlotGroup>
								<S.Slot key={`${date}-${cIdx / 2}`} />
								<S.Slot key={`${date}-${cIdx / 2 + 1}`} />
							</S.SlotGroup>
						))}
					</S.Column>
				))}
			</S.TableContainer>
		);
	};

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
							{renderTable()}
							<S.Participants>{`일정 작성 인원 (${details.numOfParticipants})`}</S.Participants>
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
