import Avatar from '@components/common/Avatar/Avatar';
import Flex from '@components/common/Flex/Flex';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import { iconName } from '@type/tokens';
import * as S from './Profile.styled';

export interface ProfileProps {
	profile: string | null;
	initial: string;
	title: string;
	subTitle?: string;
	text?: string;
	trailingIcon?: iconName;
	trailingText?: string;
}

const Profile = (props: ProfileProps) => {
	const {
		profile,
		initial,
		title,
		subTitle,
		text,
		trailingIcon,
		trailingText,
	} = props;

	return (
		<S.ProfileContainer>
			<Avatar profile={profile} initial={initial} size='md' shape='circle' />
			<Flex direction='column' justify='center' gap='2'>
				<Flex align='center' gap='6'>
					<Text
						size={text ? 'sm' : 'lg'}
						weight={text || subTitle ? 'semiBold' : 'regular'}>
						{title}
					</Text>
					{subTitle && (
						<Text size='sm' weight='regular' color='tertiary'>
							{subTitle}
						</Text>
					)}
				</Flex>
				{text && (
					<Text size='sm' weight='regular' color='secondary'>
						{text}
					</Text>
				)}
			</Flex>
			{trailingIcon && <Icon name={trailingIcon} />}
			{trailingText && (
				<Text size='sm' weight='regular' color='secondary'>
					{trailingText}
				</Text>
			)}
		</S.ProfileContainer>
	);
};

export default Profile;
