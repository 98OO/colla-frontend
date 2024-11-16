import Avatar from '@components/common/Avatar/Avatar';
import Flex from '@components/common/Flex/Flex';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import { AvatarSize, fontSize } from '@type/size';
import { iconName } from '@type/tokens';
import * as S from './Profile.styled';

export interface ProfileProps {
	profile: string | null;
	initial: string;
	avatarSize?: AvatarSize;
	avatarShape?: 'circle' | 'rect';
	title: string;
	titleSize?: fontSize;
	titleWeight?: 'regular' | 'medium' | 'semiBold' | 'bold';
	subTitle?: string;
	text?: string;
	trailingIcon?: iconName;
	trailingText?: string;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Profile = (props: ProfileProps) => {
	const {
		profile,
		initial,
		avatarSize = 'md',
		avatarShape = 'circle',
		title,
		titleSize = 'md',
		titleWeight = 'semiBold',
		subTitle,
		text,
		trailingIcon,
		trailingText,
		onClick,
	} = props;

	return (
		<S.ProfileContainer onClick={onClick}>
			<Flex gap='8' align='center'>
				<S.ProfileAvatarContainer>
					<Avatar
						profile={profile}
						initial={initial}
						size={avatarSize}
						shape={avatarShape}
					/>
				</S.ProfileAvatarContainer>
				<Flex direction='column' gap='4'>
					<Flex align='center' gap='6'>
						<Text size={titleSize} weight={titleWeight}>
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
			</Flex>
			<Flex gap='8' align='center'>
				{trailingIcon && <Icon name={trailingIcon} size='sm' />}
				{trailingText && (
					<Text size='sm' weight='regular' color='secondary'>
						{trailingText}
					</Text>
				)}
			</Flex>
		</S.ProfileContainer>
	);
};

export default Profile;
