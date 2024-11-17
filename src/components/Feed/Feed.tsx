import { useEffect, useRef, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Drawer from '@components/common/Drawer/Drawer';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import IconButton from '../common/IconButton/IconButton';
import Text from '../common/Text/Text';
import Input from '../common/Input/Input';
import FeedAuthor from '@components/Feed/FeedAuthors/FeedAuthor';
import NormalDetail from '@components/Feed/Detail/Normal/NormalDetail';
import { getFormattedDate } from '@utils/getFormattedDate';
import { FEED_DETAIL_MAX_HEIGHT } from '@styles/layout';
import type { FeedData } from '@type/feed';
import * as S from './Feed.styled';

interface ActionButtonProps {
	icon: 'Comment' | 'Attachment';
	count: number;
	onClick: () => void;
	ariaLabel: string;
}

interface FeedProps {
	feedData: FeedData;
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

const Feed = ({
	feedData,
	isDetailOpen,
	openDetail,
	closeDetail,
}: FeedProps) => {
	const { author, title, createdAt, details, attachments, comments } = feedData;
	const [showMoreButton, setShowMoreButton] = useState(false);
	const [commentText, setCommentText] = useState('');
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

	const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCommentText(e.target.value);
	};

	const handleCommentSubmit = () => {
		// 여기에 댓글 제출 로직 추가
		console.log('Comment submitted:', commentText);
		setCommentText('');
	};

	return (
		<S.FeedContainer>
			<Flex direction='column' paddingLeft='24' paddingRight='24' gap='24'>
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
				{isDetailOpen && (
					<Drawer isOpen={isDetailOpen} onClose={closeDetail}>
						<NormalDetail feedData={feedData} />
					</Drawer>
				)}
			</Flex>
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
			<Flex direction='row' marginTop='12' marginLeft='24' gap='8'>
				<CommentPreview comments={comments} />
			</Flex>
			<Flex paddingRight='24' paddingLeft='24'>
				<Flex
					direction='row'
					gap='12'
					grow='1'
					position='relative'
					marginTop='4'
					marginBottom='6'>
					<Input
						size='md'
						border='underLine'
						placeholder='댓글 달기...'
						isError={false}
						maxLength={50}
						onChange={handleCommentChange}
						value={commentText}
					/>
					{commentText.trim() && (
						<S.CommentWriteButton>
							<Button
								size='sm'
								label='작성'
								variant='text'
								onClick={handleCommentSubmit}
							/>
						</S.CommentWriteButton>
					)}
				</Flex>
			</Flex>
		</S.FeedContainer>
	);
};

export default Feed;
