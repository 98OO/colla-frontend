import styled from 'styled-components';
import theme from '@styles/theme';

export const IconButtonWrapper = styled.button<{ disabled: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	background-color: transparent;
	aspect-ratio: 1/1;
	padding: ${theme.units.spacing.space4};
	border-radius: ${theme.units.radius.radius6};
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};

	&:not(:disabled):hover {
		background-color: ${theme.color.bg.iSecondaryHover};
	}
`;
