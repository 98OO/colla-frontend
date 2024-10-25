import styled from 'styled-components';
import theme from '@styles/theme';

export const FeedMenuItemContainer = styled.div`
	display: flex;
	align-items: center;
	padding: ${theme.units.spacing.space8};
	border-radius: ${theme.units.radius.radius4};
	gap: ${theme.units.spacing.space10};
	background-color: ${theme.color.bg.primary};
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};
	}
`;
