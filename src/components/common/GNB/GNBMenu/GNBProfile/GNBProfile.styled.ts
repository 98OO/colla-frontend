import styled from 'styled-components';
import { GNB_PROFILE_WIDTH } from '@styles/layout';
import theme from '@styles/theme';

export const GNBProfileContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: ${GNB_PROFILE_WIDTH}px;
	height: 234px;

	background-color: ${theme.color.bg.primary};
	border-radius: ${theme.units.radius.radius8};
	box-shadow: ${theme.elevation.shadow.shadow4};
	z-index: ${theme.elevation.zIndex.MENU};
	gap: ${theme.units.spacing.space4};
	padding: ${theme.units.spacing.space12} ${theme.units.spacing.space16};
`;
