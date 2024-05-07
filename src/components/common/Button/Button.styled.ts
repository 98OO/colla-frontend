import styled, { css } from 'styled-components';
import theme from '@styles/theme';
import type { ButtonProps } from './Button';

const btnSizeMap = {
	lg: '48px',
	md: '40px',
	sm: '32px',
};

const btnIconSizeMap = {
	lg: '24px',
	md: '24px',
	sm: '16px',
};

const variantStyle = {
	primary: css`
		background-color: ${theme.color.bg.iPrimary};
		color: ${theme.color.text.iInverse};
		border: none;
		&:hover {
			background-color: ${theme.color.bg.iPrimaryHover};
		}
	`,
	secondary: css`
		border: 2px solid ${theme.color.border.iSecondary};
		color: ${theme.color.text.iSecondary};
		background-color: transparent;
		&:hover {
			border: 2px solid ${theme.color.border.iSecondaryHover};
			color: ${theme.color.text.iSecondaryHover};
			background-color: ${theme.color.bg.iSecondaryHover};
			svg {
				stroke: ${theme.color.icon.iSecondaryHover};
				color: ${theme.color.icon.iSecondaryHover};
			}
		}
	`,
	destructive: css`
		background-color: ${theme.color.bg.iDestructive};
		color: ${theme.color.text.iInverse};
		border: none;
		&:hover {
			background-color: ${theme.color.bg.iDestructiveHover};
		}
	`,
	text: css`
		color: ${theme.color.text.iSecondary};
		background-color: transparent;
		border: none;
		&:hover {
			color: ${theme.color.text.iSecondaryHover};
			svg {
				stroke: ${theme.color.icon.iSecondaryHover};
				color: ${theme.color.icon.iSecondaryHover};
			}
		}
	`,
};

const disabledStyle = {
	primary: css`
		background-color: ${theme.color.bg.disabled};
		border: none;
	`,
	secondary: css`
		background-color: transparent;
		border: 2px solid ${theme.color.border.disabled};
	`,
	destructive: css`
		background-color: ${theme.color.bg.disabled};
		border: none;
	`,
	text: css`
		background-color: transparent;
		border: none;
	`,
};

export const ButtonWrapper = styled.button.withConfig({
	shouldForwardProp: (prop) =>
		!['btnStyle', 'variant', 'size', 'isFull'].includes(prop),
})<Omit<ButtonProps, 'label'>>`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: ${theme.units.radius.radius6};
	height: ${(props) => btnSizeMap[props.size]};
	font-size: ${(props) => props.theme.typography.fontSize.body[props.size]};
	font-weight: ${theme.typography.fontWeight.semiBold};
	padding: ${(props) =>
		`${props.theme.units.spacing.space8} ${props.theme.units.spacing.space16}`};
	gap: ${(props) => props.theme.units.spacing.space4};

	svg {
		width: ${(props) => btnIconSizeMap[props.size]};
		height: ${(props) => btnIconSizeMap[props.size]};
	}

	${(props) => props.isFull && css({ width: '100%' })}

	${({ variant, disabled }) => {
		if (disabled) {
			return css`
				${disabledStyle[variant]}
				color: ${theme.color.text.disabled};
			`;
		}
		return css`
			${variantStyle[variant]}
		`;
	}};
`;
