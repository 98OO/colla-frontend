import styled, { css } from 'styled-components';
import theme from '@styles/theme';
import type { InputContainerProps, InputWrapperProps } from './Input';

const inputSizeMap = {
	lg: '48px',
	md: '40px',
	sm: '32px',
};

export const InputContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => !['isError', 'border'].includes(prop),
})<InputContainerProps>`
	display: flex;
	flex-grow: 1;
	align-items: center;
	gap: ${(props) => props.theme.units.spacing.space16};
	height: ${(props) => inputSizeMap[props.size]};
	padding: 0 ${(props) => props.theme.units.spacing.space10};
	input {
		font-size: ${(props) => props.theme.typography.fontSize.body[props.size]};
	}

	${(props) =>
		props.border === 'default'
			? css({
					border: '1px solid',
					borderRadius: `${theme.units.radius.radius6}`,
				})
			: css({ borderBottom: '1px solid' })}
	border-color: ${theme.color.border.primary};

	&:focus-within {
		border-width: 2px;
		border-color: ${theme.color.border.focusRing};
	}
	${(props) =>
		props.isError && css({ borderColor: props.theme.color.border.danger })}
`;

export const InputWrapper = styled.input<InputWrapperProps>`
	flex: 1;
	border: none;
	outline: none;
	padding: 0;
	color: ${theme.color.text.primary};
	&::placeholder {
		color: ${theme.color.text.placeholder};
	}
	font-weight: ${theme.typography.fontWeight.medium};
`;
