import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Profile from '@components/common/Profile/Profile';
import Attachments from '@components/Feed/Attachments/Attachments';
import Comment from '@components/Feed/Comments/Comment';
import type { FeedData } from '@type/feed';
import * as S from './Feed.styled';

interface FeedProps {
	feedData: FeedData;
}

const Feed = ({ feedData }: FeedProps) => {
	const { author, title, createdAt, details, attachments, comments } = feedData;

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
				{details && <S.DetailWrapper>{details.content}</S.DetailWrapper>}
				{attachments.length !== 0 && (
					<Flex direction='column' gap='12'>
						{attachments.map((attachment) => {
							return <Attachments attachment={attachment} />;
						})}
					</Flex>
				)}
				{comments.length !== 0 && (
					<S.CommentContainer>
						<Flex direction='column' align='flex-start'>
							<Button
								type='button'
								size='md'
								variant='text'
								label={`댓글 ${comments.length}개 모두 보기`}
								onClick={() => {}}
							/>
						</Flex>
						<Divider size='sm' />
						{comments.slice(0, 2).map((comment) => {
							return (
								<Flex direction='column' gap='8'>
									<Comment comment={comment} />
									<Divider size='sm' />
								</Flex>
							);
						})}
					</S.CommentContainer>
				)}
			</Flex>
		</S.FeedContainer>
	);
};

export default Feed;
