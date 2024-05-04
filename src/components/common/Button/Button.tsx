import Icon from '@components/common/Icon/Icon';
import type { buttonSize } from '@type/size';
import type { iconName } from '@type/tokens';
import * as S from './Button.styled';

type buttonVariant = 'primary' | 'secondary' | 'destructive';

export interface ButtonProps {
	label: string;
	variant: buttonVariant;
	size: buttonSize;
	isFull?: boolean;
	disabled?: boolean;
	leadingIcon?: iconName;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const getIconColor = (variant: buttonVariant, disabled: boolean) => {
	if (disabled) return 'disabled';
	if (variant === 'secondary') return 'iSecondary';
	return 'iInverse';
};

export const Button = (props: ButtonProps) => {
	const {
		label,
		variant,
		size,
		isFull = false,
		disabled = false,
		leadingIcon,
		onClick,
	} = props;

	return (
		<S.ButtonWrapper
			variant={variant}
			size={size}
			isFull={isFull}
			disabled={disabled}
			onClick={onClick}>
			{leadingIcon && (
				<Icon name={leadingIcon} color={getIconColor(variant, disabled)} />
			)}
			{label}
		</S.ButtonWrapper>
	);
};
