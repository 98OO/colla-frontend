import { forwardRef } from 'react';
import Icon from '@components/common/Icon/Icon';
import type { inputSize } from '@type/size';
import type { iconColor, iconName } from '@type/tokens';
import * as S from './Input.styled';

export interface InputContainerProps {
	size: inputSize;
	border?: 'default' | 'underLine';
	isError: boolean;
	trailingIcon?: iconName;
	trailingIconColor?: iconColor;
}

export interface InputWrapperProps {
	placeholder?: string;
	type?: 'text' | 'password';
	value: string;
	maxLength?: number;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<
	HTMLInputElement,
	InputContainerProps & InputWrapperProps
>((props, ref) => {
	const {
		size,
		border = 'default',
		isError,
		trailingIcon,
		trailingIconColor,
		...attributes
	} = props;

	return (
		<S.InputContainer size={size} border={border} isError={isError}>
			<S.InputWrapper ref={ref} {...attributes} />
			{trailingIcon && (
				<Icon name={trailingIcon} size={size} color={trailingIconColor} />
			)}
		</S.InputContainer>
	);
});

export default Input;
