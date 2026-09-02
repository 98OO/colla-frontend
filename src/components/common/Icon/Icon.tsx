import { iconSize } from '@type/size';
import { iconColor } from '@type/tokens';
import theme from '@styles/theme';
import type { IconComponent } from '@type/icon';

export interface IconProps {
	icon: IconComponent;
	color?: iconColor;
	size?: iconSize;
}

const sizeMap = {
	xl: '48px',
	lg: '32px',
	md: '24px',
	sm: '16px',
};

function Icon({ icon: SvgIcon, color = 'primary', size = 'md' }: IconProps) {
	return (
		<SvgIcon
			viewBox='0 0 24 24'
			stroke={theme.color.icon[color]}
			color={theme.color.icon[color]}
			width={sizeMap[size]}
			height={sizeMap[size]}
		/>
	);
}

export default Icon;
