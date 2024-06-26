import Icon from '@components/common/Icon/Icon';
import type { buttonSize } from '@type/size';
import type { iconName } from '@type/tokens';
import * as S from './Button.styled';

type buttonVariant = 'primary' | 'secondary' | 'destructive' | 'text';

export interface ButtonProps {
	label: string;
	variant: buttonVariant;
	size: buttonSize;
	isFull?: boolean;
	type?: 'button' | 'reset' | 'submit';
	disabled?: boolean;
	leadingIcon?: iconName;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const getIconColor = (variant: buttonVariant, disabled: boolean) => {
	if (disabled) return 'disabled';
	if (variant === 'secondary' || variant === 'text') return 'iSecondary';
	return 'iInverse';
};

export const Button = (props: ButtonProps) => {
	const {
		label,
		variant,
		size,
		isFull = false,
		type = 'button',
		disabled = false,
		leadingIcon,
		onClick,
	} = props;

	return (
		<S.ButtonWrapper
			variant={variant}
			size={size}
			isFull={isFull}
			type={type}
			disabled={disabled}
			onClick={onClick}>
			{leadingIcon && (
				<Icon name={leadingIcon} color={getIconColor(variant, disabled)} />
			)}
			{label}
		</S.ButtonWrapper>
	);
};
