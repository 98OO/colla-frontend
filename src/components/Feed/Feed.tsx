import { useEffect, useRef, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Drawer from '@components/common/Drawer/Drawer';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Profile from '@components/common/Profile/Profile';
import Attachments from '@components/Feed/Attachments/Attachments';
import Comment from '@components/Feed/Comments/Comment';
import NormalDetail from '@components/Feed/Detail/Normal/NormalDetail';
import { useOverlay } from '@hooks/common/useOverlay';
import { PREVIEW_LIMIT } from '@constants/feed';
import { FEED_DETAIL_MAX_HEIGHT } from '@styles/layout';
import type { FeedData } from '@type/feed';
import * as S from './Feed.styled';

interface CommentPreviewProps {
	comments: FeedData['comments'];
	openDetail: () => void;
}

interface AttachmentPreviewProps {
	attachments: FeedData['attachments'];
	openDetail: () => void;
}

interface FeedProps {
	feedData: FeedData;
}

const CommentPreview = ({ comments, openDetail }: CommentPreviewProps) => {
	return (
		<S.SectionContainer>
			{comments.length > PREVIEW_LIMIT.comments && (
				<>
					<S.SectionHeader>
						<Button
							type='button'
							size='md'
							variant='text'
							label={`댓글 ${comments.length}개 모두 보기`}
							onClick={openDetail}
						/>
					</S.SectionHeader>
					<Divider size='sm' />
				</>
			)}
			{comments.slice(0, PREVIEW_LIMIT.comments).map((comment) => (
				<Flex direction='column' gap='8'>
					<Comment comment={comment} />
					<Divider size='sm' />
				</Flex>
			))}
		</S.SectionContainer>
	);
};

const AttachmentPreview = ({
	attachments,
	openDetail,
}: AttachmentPreviewProps) => {
	return (
		<S.SectionContainer>
			{attachments.length > PREVIEW_LIMIT.attachments && (
				<>
					<S.SectionHeader>
						<Button
							type='button'
							size='md'
							variant='text'
							label={`첨부파일 ${attachments.length}개 모두 보기`}
							onClick={openDetail}
						/>
					</S.SectionHeader>
					<Divider size='sm' />
				</>
			)}
			{attachments.slice(0, PREVIEW_LIMIT.attachments).map((attachment) => (
				<Attachments key={attachment.id} attachment={attachment} />
			))}
		</S.SectionContainer>
	);
};

const Feed = ({ feedData }: FeedProps) => {
	const { author, title, createdAt, details, attachments, comments } = feedData;
	const { open, close, isOpen } = useOverlay();
	const [showMoreButton, setShowMoreButton] = useState(false);
	const detailRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!detailRef.current) return;

		if (detailRef.current.scrollHeight > FEED_DETAIL_MAX_HEIGHT) {
			setShowMoreButton(true);
		}
	}, [details]);

	return (
		<S.FeedContainer>
			<Profile
				profile={author.profileImageUrl}
				initial={author.username.charAt(0)}
				avatarSize='lg'
				title={author.username}
				titleSize='lg'
				titleWeight='medium'
				subTitle={author?.tag?.name || ''}
				text={createdAt}
				trailingIcon='Kebab'
			/>
			<Flex direction='column' gap='12'>
				<Heading size='xs'>{title}</Heading>
				<Divider size='sm' />
				{details && (
					<S.DetailWrapper ref={detailRef}>
						<div dangerouslySetInnerHTML={{ __html: details.content || '' }} />
					</S.DetailWrapper>
				)}
				{showMoreButton && (
					<Button
						type='button'
						size='md'
						variant='text'
						label='상세 보기'
						onClick={open}
					/>
				)}
				{attachments.length > 0 && (
					<AttachmentPreview attachments={attachments} openDetail={open} />
				)}
				{comments.length > 0 && (
					<CommentPreview comments={comments} openDetail={open} />
				)}
			</Flex>
			<Drawer isOpen={isOpen} onClose={close}>
				<NormalDetail feedData={feedData} />
			</Drawer>
		</S.FeedContainer>
	);
};

export default Feed;
