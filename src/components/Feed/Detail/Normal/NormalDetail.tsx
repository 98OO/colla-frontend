import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Profile from '@components/common/Profile/Profile';
import Text from '@components/common/Text/Text';
import Attachments from '@components/Feed/Attachments/Attachments';
import Comment from '@components/Feed/Comments/Comment';
import type { FeedData } from '@type/feed';
import * as S from './NormalDetail.styled';

interface FeedProps {
	feedData: FeedData;
}

const Feed = ({ feedData }: FeedProps) => {
	const { author, title, createdAt, details, attachments, comments, images } =
		feedData;

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
				{images.length !== 0 && (
					<Flex justify='center'>
						<S.ImageGrid>
							{images.map((image) => {
								return <img alt={image.name} src={image.fileUrl} />;
							})}
						</S.ImageGrid>
					</Flex>
				)}
				{details && <S.DetailWrapper>{`${details.content}`}</S.DetailWrapper>}
				{attachments.length !== 0 && (
					<S.AttachmentWrapper>
						{attachments.map((attachment) => {
							return <Attachments attachment={attachment} />;
						})}
					</S.AttachmentWrapper>
				)}
				{comments.length !== 0 && (
					<S.CommentContainer>
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
					</S.CommentContainer>
				)}
			</Flex>
		</S.FeedContainer>
	);
};

export default Feed;
