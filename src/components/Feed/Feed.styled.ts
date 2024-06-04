import { styled } from 'styled-components';
import theme from '@styles/theme';

export const FeedContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space20};
	width: 680px;
	height: 720px;
	padding: ${theme.units.spacing.space24};
	border-radius: ${theme.units.radius.radius12};
	box-shadow: ${theme.elevation.shadow.shadow8};
	margin-bottom: ${theme.units.spacing.space32};
`;
