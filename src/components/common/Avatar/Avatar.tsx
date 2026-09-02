import Heading from '@components/common/Heading/Heading';
import Text from '@components/common/Text/Text';
import type { AvatarSize, fontSize, headingSize } from '@type/size';
import * as S from './Avatar.styled';

export interface ResponsiveImage {
	srcSet: string;
	sizes: string;
	fallbackSrc: string;
}

export interface AvatarProps {
	profile: string | null;
	responsiveImage?: ResponsiveImage;
	initial: string;
	size: AvatarSize | 'mlg';
	shape: 'circle' | 'rect';
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const sizeMap = {
	xl: 'xl',
	lg: 'xs',
	mlg: 'mlg',
	md: 'md',
	sm: 'sm',
	xs: 'sm',
};

const textMap = {
	heading: (initial: string, size: headingSize) => (
		<Heading size={size} color='iInverse'>
			{initial}
		</Heading>
	),
	text: (initial: string, size: fontSize) => (
		<Text size={size} color='iInverse' weight={size === 'md' ? 'medium' : 'regular'}>
			{initial}
		</Text>
	),
};

const Avatar = (props: AvatarProps) => {
	const { profile, responsiveImage, initial, size, shape, onClick } = props;
	const avatarText = size === 'xl' || size === 'lg' ? 'heading' : 'text';

	const restoreFallbackImage: React.ReactEventHandler<HTMLImageElement> = ({ currentTarget }) => {
		if (!responsiveImage || currentTarget.getAttribute('src') === responsiveImage.fallbackSrc)
			return;

		currentTarget.removeAttribute('srcset');
		currentTarget.removeAttribute('sizes');
		currentTarget.setAttribute('src', responsiveImage.fallbackSrc);
	};

	return (
		<S.AvatarContainer
			profile={profile}
			size={size}
			shape={shape}
			onClick={onClick}
			$seed={initial}>
			{profile ? (
				<img
					src={profile}
					srcSet={responsiveImage?.srcSet}
					sizes={responsiveImage?.sizes}
					alt='profile'
					loading={responsiveImage ? 'lazy' : undefined}
					decoding={responsiveImage ? 'async' : undefined}
					onError={restoreFallbackImage}
				/>
			) : (
				textMap[avatarText](initial[0], sizeMap[size] as headingSize & fontSize)
			)}
		</S.AvatarContainer>
	);
};

export default Avatar;
