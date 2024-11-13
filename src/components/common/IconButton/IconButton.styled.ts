import styled from 'styled-components';
import theme from '@styles/theme';

export const IconButtonWrapper = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	background-color: transparent;
	aspect-ratio: 1/1;
	padding: ${theme.units.spacing.space4};
	border-radius: ${theme.units.radius.radius6};
	cursor: pointer;
	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};
	}
`;
