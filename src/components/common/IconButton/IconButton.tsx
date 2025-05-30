import Icon from '@components/common/Icon/Icon';
import { iconSize } from '@type/size';
import { iconColor, iconName } from '@type/tokens';
import * as S from './IconButton.styled';

export interface IconButtonProps {
	icon: iconName;
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
		<S.IconButtonWrapper
			type='button'
			aria-label={ariaLabel}
			onClick={onClick}
			disabled={disabled}>
			<Icon name={icon} size={size} color={color} />
		</S.IconButtonWrapper>
	);
};

export default IconButton;
