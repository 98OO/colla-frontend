import Avatar from '@components/common/Avatar/Avatar';
import Flex from '@components/common/Flex/Flex';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import * as S from './FeedAuthor.styled';

export interface FeedAuthorProps {
	profile: string | null;
	initial: string;
	title: string;
	tag?: string;
	createdAt: string;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const FeedAuthor = (props: FeedAuthorProps) => {
	const { profile, initial, title, tag, createdAt, onClick } = props;

	return (
		<S.FeedAuthorContainer onClick={onClick}>
			<Flex gap='8' align='center'>
				<S.FeedAuthorAvatarContainer>
					<Avatar
						profile={profile}
						initial={initial}
						size='mlg'
						shape='circle'
					/>
				</S.FeedAuthorAvatarContainer>
				<Flex direction='column' gap='8'>
					<Flex align='center' gap='6'>
						<Text size='md' weight='semiBold'>
							{title}
						</Text>
						<Text size='md' weight='regular' color='tertiary'>
							{createdAt}
						</Text>
					</Flex>
					{tag && (
						<Text size='sm' weight='regular' color='tertiary'>
							{tag}
						</Text>
					)}
				</Flex>
			</Flex>
			<Flex gap='8' align='center'>
				<Icon name='Kebab' size='sm' />
			</Flex>
		</S.FeedAuthorContainer>
	);
};

export default FeedAuthor;
