import { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import SubTask from '@components/Feed/CollectFeed/SubTask/SubTask';
import CommentInput from '@components/Feed/CommentInput/CommentInput';
import Comment from '@components/Feed/Comments/Comment';
import SubTaskDetail from '@components/Feed/Detail/SubTask/SubTaskDetail';
import FeedAuthor from '@components/Feed/FeedAuthors/FeedAuthor';
import ProgressChip from '@components/Feed/ProgressChip/ProgressChip';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { getFormattedDate } from '@utils/getFormattedDate';
import type { CollectFeed, Author } from '@type/feed';
import * as S from './CollectDetail.styled';

interface FeedProps {
	feedData: CollectFeed;
}

const CollectDetail = ({ feedData }: FeedProps) => {
	const { feedId, author, title, createdAt, details, comments } = feedData;
	const { userStatus } = useUserStatusQuery();
	const [selectSubTask, setSelectSubTask] = useState<Author | null>(null);

	return (
		<S.FeedContainer>
			<Flex align='center'>
				<Button
					label='자료 수집 상세 페이지'
					variant='text'
					size='md'
					onClick={() => setSelectSubTask(null)}
				/>
				{selectSubTask && (
					<Flex align='center' gap='10'>
						<Icon name='ChevronRight' />
						<Text size='md' weight='semiBold' color='iSecondary'>
							{selectSubTask.username}
						</Text>
					</Flex>
				)}
			</Flex>
			{selectSubTask ? (
				<SubTaskDetail subTaskAuthor={selectSubTask} feedId={feedId} />
			) : (
				<>
					<FeedAuthor
						profile={author.profileImageUrl}
						initial={author.username.charAt(0)}
						title={author.username}
						createdAt={getFormattedDate(createdAt, 'detail')}
						tag={author?.tag?.name || ''}
					/>
					<Flex direction='column' gap='12'>
						<Heading size='xs'>{title}</Heading>
						<Divider size='sm' />
						<Flex direction='column' gap='16' marginBottom='20'>
							<Flex align='center' gap='14'>
								<Icon name='Clock' />
								<Flex gap='8'>
									<ProgressChip type='PENDING' status={!details.isClosed} />
									<ProgressChip type='COMPLETED' status={details.isClosed} />
								</Flex>
							</Flex>
							<Flex align='center' gap='14'>
								<Icon name='Calendar' />
								<Text size='md' weight='regular'>
									{getFormattedDate(createdAt, 'detail')}
								</Text>
							</Flex>
							<Flex align='center' gap='14'>
								<Icon name='Calendar' />
								{details.dueAt && (
									<Text size='md' weight='regular'>
										{`${getFormattedDate(details.dueAt, 'detail')} 까지`}
									</Text>
								)}
							</Flex>
							<S.DetailWrapper>
								<div
									dangerouslySetInnerHTML={{ __html: details.content || '' }}
								/>
							</S.DetailWrapper>
						</Flex>
						<Flex direction='column' gap='12'>
							<Flex align='center' gap='6'>
								<Text size='lg' weight='semiBold'>
									하위 업무
								</Text>
								<Text size='lg' weight='semiBold' color='tertiary'>
									{details.responses.length.toString()}
								</Text>
							</Flex>
							<Flex direction='column'>
								{details.responses.map((task) => (
									<SubTask
										subTaskData={task}
										onClick={() => setSelectSubTask(task.author)}
									/>
								))}
							</Flex>
						</Flex>
					</Flex>
					{comments.length !== 0 && (
						<S.SectionContainer>
							<Flex direction='column' align='flex-start'>
								<Text
									size='md'
									weight='medium'
									color='tertiary'>{`댓글 ${comments.length}개`}</Text>
							</Flex>
							<Divider size='sm' />
							{comments.map((comment) => {
								return (
									<Flex direction='column' gap='8'>
										<Comment comment={comment} />
										<Divider size='sm' />
									</Flex>
								);
							})}
						</S.SectionContainer>
					)}
					{userStatus && (
						<CommentInput
							teamspaceId={userStatus.profile.lastSeenTeamspaceId}
							feedId={feedId}
						/>
					)}
				</>
			)}
		</S.FeedContainer>
	);
};

export default CollectDetail;
