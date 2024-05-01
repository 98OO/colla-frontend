import * as Icons from '@assets/svg/index';
import { iconSize } from '@type/size';
import { iconColor } from '@type/tokens';
import theme from '@styles/theme';

export interface IconProps {
	name: keyof typeof Icons;
	color?: iconColor;
	size?: iconSize;
}

const sizeMap = {
	xl: '48px',
	lg: '32px',
	md: '24px',
	sm: '16px',
};

function Icon({ name, color = 'primary', size = 'md' }: IconProps) {
	const IconComponent = Icons[name];

	return (
		<IconComponent
			viewBox='0 0 24 24'
			stroke={theme.color.icon[color]}
			color={theme.color.icon[color]}
			width={sizeMap[size]}
			height={sizeMap[size]}
		/>
	);
}

export default Icon;
