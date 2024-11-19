import Avatar from '@components/common/Avatar/Avatar';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import ProgressChip from '@components/Feed/ProgressChip/ProgressChip';
import { getFormattedDate } from '@utils/getFormattedDate';
import type { CollectResponse } from '@type/feed';
import * as S from './SubTask.styled';

interface SubTaskProps {
	subTaskData: CollectResponse;
	onClick: () => void;
}

const SubTask = ({ subTaskData, onClick }: SubTaskProps) => {
	const { title, status, updatedAt, author } = subTaskData;

	return (
		<S.SubTaskContainer onClick={onClick}>
			<Flex align='center' gap='10'>
				<ProgressChip type={status} />
				{title && (
					<Text size='lg' weight='medium'>
						{title}
					</Text>
				)}
			</Flex>
			<Flex align='center' gap='14'>
				{status !== 'PENDING' && (
					<Text size='md' weight='regular' color='tertiary'>
						{getFormattedDate(updatedAt, 'collectDate')}
					</Text>
				)}
				<Avatar
					profile={author.profileImageUrl}
					initial={author.username.charAt(0)}
					size='md'
					shape='circle'
				/>
			</Flex>
		</S.SubTaskContainer>
	);
};

export default SubTask;
