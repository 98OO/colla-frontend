import Avatar from '@components/common/Avatar/Avatar';
import Flex from '@components/common/Flex/Flex';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import * as S from './Comment.styled';

interface Comment {
	author: {
		id: number;
		profileImageUrl: string | null;
		username: string;
	};
	content: string;
	createdAt: string;
}

interface CommentsProps {
	comment: Comment;
}

const Comment = ({ comment }: CommentsProps) => {
	const { author, content, createdAt } = comment;

	return (
		<S.CommentContainer>
			<Flex gap='8' align='flex-start'>
				<S.AvatarContainer>
					<Avatar
						profile={author.profileImageUrl}
						initial={author.username.charAt(0)}
						size='mlg'
						shape='circle'
					/>
				</S.AvatarContainer>
				<Flex direction='column' gap='8'>
					<Flex align='center' gap='6'>
						<Text size='md' weight='bold'>
							{author.username}
						</Text>
						<Text size='md' weight='regular' color='tertiary'>
							{createdAt}
						</Text>
					</Flex>
					<Text size='md' weight='regular' color='primary'>
						{content}
					</Text>
				</Flex>
			</Flex>
			<Flex gap='8' align='center'>
				<Icon name='Kebab' size='sm' />
			</Flex>
		</S.CommentContainer>
	);
};

export default Comment;
