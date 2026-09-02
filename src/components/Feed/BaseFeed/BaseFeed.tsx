import { ReactNode } from 'react';
import { ReactComponent as AttachmentIcon } from '@assets/svg/attachment.svg';
import { ReactComponent as CommentIcon } from '@assets/svg/comment.svg';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import ActionButton from '@components/Feed/ActionButton/ActionButton';
import FeedAuthor from '@components/Feed/FeedAuthors/FeedAuthor';
import { CommentPreview } from '@components/Feed/Preview/Preview';
import { selectFeedDetail } from '@stores/feedDetailStore';
import { getFormattedDate } from '@utils/getFormattedDate';
import type { FeedData } from '@type/feed';
import * as S from './BaseFeed.styled';

interface BaseFeedProps {
	children: ReactNode;
	feedData: FeedData;
}

const BaseFeed = ({ feedData, children }: BaseFeedProps) => {
	const { feedId, author, title, createdAt, comments, attachments } = feedData;
	const openDetail = () => selectFeedDetail(feedId);

	return (
		<S.FeedContainer>
			<S.FeedContent>
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
					{children}
				</Flex>
			</S.FeedContent>
			<S.DividerWrapper>
				<Divider size='sm' />
			</S.DividerWrapper>
			<Flex marginLeft='18' gap='8'>
				<ActionButton
					icon={CommentIcon}
					count={comments.length}
					onClick={openDetail}
					ariaLabel='댓글'
				/>
				{attachments.length > 0 && (
					<ActionButton
						icon={AttachmentIcon}
						count={attachments.length}
						onClick={openDetail}
						ariaLabel='첨부파일'
					/>
				)}
			</Flex>
			<S.PreviewWrapper>
				<CommentPreview comments={comments} />
			</S.PreviewWrapper>
		</S.FeedContainer>
	);
};

export default BaseFeed;
