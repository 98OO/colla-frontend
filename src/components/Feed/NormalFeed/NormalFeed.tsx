import { useEffect, useRef, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Drawer from '@components/common/Drawer/Drawer';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import ActionButton from '@components/Feed/ActionButton/ActionButton';
import NormalDetail from '@components/Feed/Detail/Normal/NormalDetail';
import FeedAuthor from '@components/Feed/FeedAuthors/FeedAuthor';
import { CommentPreview } from '@components/Feed/Preview/Preview';
import { getFormattedDate } from '@utils/getFormattedDate';
import { FEED_DETAIL_MAX_HEIGHT } from '@styles/layout';
import type { FeedData } from '@type/feed';
import * as S from './NormalFeed.styled';

interface FeedProps {
	feedData: FeedData;
	isDetailOpen: boolean;
	openDetail: () => void;
	closeDetail: () => void;
}

const NormalFeed = ({
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
			<Flex
				direction='row'
				marginTop='12'
				marginLeft='24'
				marginBottom='6'
				gap='8'>
				<CommentPreview comments={comments} />
			</Flex>
		</S.FeedContainer>
	);
};

export default NormalFeed;
