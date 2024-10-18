import styled from 'styled-components';
import theme from '@styles/theme';

export const FeedMenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 200px;
	gap: ${theme.units.spacing.space10};
	padding: ${theme.units.spacing.space4};
	border: 1px solid ${theme.color.border.tertiary};
	border-radius: ${theme.units.radius.radius4};
	background-color: ${theme.color.bg.primary};
	box-shadow: ${theme.elevation.shadow.shadow4};
`;
