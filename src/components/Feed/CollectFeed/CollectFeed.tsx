import { useEffect, useRef, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Drawer from '@components/common/Drawer/Drawer';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import ActionButton from '@components/Feed/ActionButton/ActionButton';
import SubTask from '@components/Feed/CollectFeed/SubTask/SubTask';
import CollectDetail from '@components/Feed/Detail/Collect/CollectDetail';
import FeedAuthor from '@components/Feed/FeedAuthors/FeedAuthor';
import { CommentPreview } from '@components/Feed/Preview/Preview';
import ProgressChip from '@components/Feed/ProgressChip/ProgressChip';
import { getFormattedDate } from '@utils/getFormattedDate';
import { FEED_DETAIL_MAX_HEIGHT } from '@styles/layout';
import type { CollectFeed } from '@type/feed';
import * as S from './CollectFeed.styled';

interface FeedProps {
	feedData: CollectFeed;
	isDetailOpen: boolean;
	openDetail: () => void;
	closeDetail: () => void;
}

const CollectFeed = ({
	feedData,
	isDetailOpen,
	openDetail,
	closeDetail,
}: FeedProps) => {
	const { author, title, createdAt, details, attachments, comments } = feedData;
	const [showMoreButton, setShowMoreButton] = useState(false);
	const detailRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new ResizeObserver(() => {
			if (!detailRef.current) return;

			setShowMoreButton(
				detailRef.current.scrollHeight > FEED_DETAIL_MAX_HEIGHT
			);
		});

		if (detailRef.current) {
			observer.observe(detailRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [details?.content]);

	return (
		<S.FeedContainer>
			<S.CollectContainer>
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
					<Flex direction='column' gap='16'>
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
						{details && (
							<S.DetailWrapper ref={detailRef} hasMoreButton={showMoreButton}>
								<div
									dangerouslySetInnerHTML={{ __html: details.content || '' }}
								/>
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
				</Flex>
				{isDetailOpen && (
					<Drawer isOpen={isDetailOpen} onClose={closeDetail}>
						<CollectDetail feedData={feedData} />
					</Drawer>
				)}
			</S.CollectContainer>
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
				{attachments.length > 0 && (
					<ActionButton
						icon='Attachment'
						count={attachments.length}
						onClick={openDetail}
						ariaLabel='첨부파일'
					/>
				)}
			</Flex>
			<S.CommentPreviewWrapper>
				<CommentPreview comments={comments} />
			</S.CommentPreviewWrapper>
		</S.FeedContainer>
	);
};

export default CollectFeed;
