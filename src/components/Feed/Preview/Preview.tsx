import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import type { FeedData } from '@type/feed';

interface CommentPreviewProps {
	comments: FeedData['comments'];
}

export const CommentPreview = ({ comments }: CommentPreviewProps) => {
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
