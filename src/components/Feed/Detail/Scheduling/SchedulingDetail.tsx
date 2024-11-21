import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Text from '@components/common/Text/Text';
import CommentInput from '@components/Feed/CommentInput/CommentInput';
import Comment from '@components/Feed/Comments/Comment';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { getFormattedDate } from '@utils/getFormattedDate';
import type { FeedData } from '@type/feed';
import FeedAuthor from '../../FeedAuthors/FeedAuthor';
import * as S from './SchedulingDetail.styled';

interface FeedProps {
	feedData: FeedData;
}

const SchedulingDetail = ({ feedData }: FeedProps) => {
	const { feedId, author, title, createdAt, details, comments } = feedData;
	const { userStatus } = useUserStatusQuery();

	return (
		<S.FeedContainer>
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
				<S.DetailWrapper>{details && '일정 조율 디테일'}</S.DetailWrapper>
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
				<S.CommentContainer>
					{userStatus && (
						<CommentInput
							teamspaceId={userStatus.profile.lastSeenTeamspaceId}
							feedId={feedId}
						/>
					)}
				</S.CommentContainer>
			</Flex>
		</S.FeedContainer>
	);
};

export default SchedulingDetail;
