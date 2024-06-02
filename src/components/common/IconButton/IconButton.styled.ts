import styled from 'styled-components';
import theme from '@styles/theme';

export const IconButtonWrapper = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
	box-sizing: border-box;
	border: none;
	background-color: transparent;
	padding: ${theme.units.spacing.space4};
	border-radius: ${theme.units.radius.radius6};
	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};
	}
`;
