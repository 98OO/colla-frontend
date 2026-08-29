import { ReactComponent as CalendarIcon } from '@assets/svg/calendar.svg';
import { ReactComponent as ClockIcon } from '@assets/svg/clock.svg';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Icon from '@components/common/Icon/Icon';
import SanitizedHtml from '@components/common/SanitizedHtml/SanitizedHtml';
import Text from '@components/common/Text/Text';
import BaseFeed from '@components/Feed/BaseFeed/BaseFeed';
import SubTask from '@components/Feed/CollectFeed/SubTask/SubTask';
import ProgressChip from '@components/Feed/ProgressChip/ProgressChip';
import useDetailObserver from '@hooks/feed/useDetailObserver';
import { selectFeedDetail } from '@stores/feedDetailStore';
import { getFormattedDate } from '@utils/getFormattedDate';
import type { CollectFeed } from '@type/feed';
import * as S from './CollectFeed.styled';

interface CollectFeedProps {
	feedData: CollectFeed;
}

const CollectFeed = ({ feedData }: CollectFeedProps) => {
	const { feedId, details, createdAt } = feedData;
	const { content } = details;
	const { showMoreButton, detailRef } = useDetailObserver(content);
	const openDetail = () => selectFeedDetail(feedId);

	return (
		<BaseFeed feedData={feedData}>
			<Flex direction='column' gap='16'>
				<Flex align='center' gap='14'>
					<Icon icon={ClockIcon} />
					<Flex gap='8'>
						<ProgressChip type='PENDING' status={!details.isClosed} />
						<ProgressChip type='COMPLETED' status={details.isClosed} />
					</Flex>
				</Flex>
				<Flex align='center' gap='14'>
					<Icon icon={CalendarIcon} />
					<Text size='md' weight='regular'>
						{getFormattedDate(createdAt, 'detail')}
					</Text>
				</Flex>
				<Flex align='center' gap='14'>
					<Icon icon={CalendarIcon} />
					{details.dueAt && (
						<Text size='md' weight='regular'>
							{`${getFormattedDate(details.dueAt, 'detail')} 까지`}
						</Text>
					)}
				</Flex>
				{details && (
					<S.DetailWrapper ref={detailRef} hasMoreButton={showMoreButton}>
						<SanitizedHtml html={details.content} />
					</S.DetailWrapper>
				)}
				{showMoreButton && (
					<Flex>
						<Button
							type='button'
							size='sm'
							variant='secondary'
							label='더보기'
							onClick={openDetail}
						/>
					</Flex>
				)}
			</Flex>
			<Flex direction='column' gap='12'>
				<Flex align='center' gap='6'>
					<Text size='lg' weight='semiBold'>
						하위업무
					</Text>
					<Text size='lg' weight='semiBold' color='tertiary'>
						{details.responses.length.toString()}
					</Text>
				</Flex>
				<Flex direction='column'>
					{details.responses.map((task) => (
						<SubTask subTaskData={task} onClick={openDetail} />
					))}
				</Flex>
			</Flex>
		</BaseFeed>
	);
};

export default CollectFeed;
