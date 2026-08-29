import Icon from '@components/common/Icon/Icon';
import { iconSize } from '@type/size';
import { iconColor } from '@type/tokens';
import type { IconComponent } from '@type/icon';
import * as S from './IconButton.styled';

export interface IconButtonProps {
	icon: IconComponent;
	ariaLabel: string;
	color?: iconColor;
	size?: iconSize;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
}

const IconButton = ({
	icon,
	ariaLabel,
	color = 'primary',
	size = 'md',
	onClick,
	disabled = false,
}: IconButtonProps) => {
	return (
		<S.IconButtonWrapper type='button' aria-label={ariaLabel} onClick={onClick} disabled={disabled}>
			<Icon icon={icon} size={size} color={color} />
		</S.IconButtonWrapper>
	);
};

export default IconButton;
