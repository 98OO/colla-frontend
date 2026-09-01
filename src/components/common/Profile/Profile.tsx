import Avatar, { type ResponsiveImage } from '@components/common/Avatar/Avatar';
import Flex from '@components/common/Flex/Flex';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import { AvatarSize, fontSize } from '@type/size';
import type { IconComponent } from '@type/icon';
import * as S from './Profile.styled';

export interface ProfileProps {
	profile: string | null;
	responsiveImage?: ResponsiveImage;
	initial: string;
	avatarSize?: AvatarSize | 'mlg';
	avatarShape?: 'circle' | 'rect';
	title: string;
	titleSize?: fontSize;
	titleWeight?: 'regular' | 'medium' | 'semiBold' | 'bold';
	subTitle?: string;
	text?: string;
	trailingIcon?: IconComponent;
	trailingText?: string;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Profile = (props: ProfileProps) => {
	const {
		profile,
		responsiveImage,
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
						responsiveImage={responsiveImage}
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
				{trailingIcon && <Icon icon={trailingIcon} size='sm' />}
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
