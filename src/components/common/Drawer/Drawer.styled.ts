import * as m from 'motion/react-m';
import styled from 'styled-components';
import { DRAWER_MAX_WIDTH } from '@styles/layout';
import theme from '@styles/theme';

export const DrawerContainer = styled(m.div)`
	position: fixed;
	top: 0;
	right: 0;
	z-index: ${theme.elevation.zIndex.DRAWER};
	display: flex;
	width: min(${DRAWER_MAX_WIDTH}px, 100vw);
	height: 100%;
	overflow: hidden;
	box-shadow:
		rgba(15, 15, 15, 0.04) 0px 0px 0px 1px,
		rgba(15, 15, 15, 0.03) 0px 3px 6px,
		rgba(15, 15, 15, 0.06) 0px 9px 24px;
`;

export const DrawerMenu = styled.div`
	display: flex;
	height: 64px;
	align-items: center;
	padding: ${theme.units.spacing.space8} ${theme.units.spacing.space24};
`;

export const DrawerContent = styled.div`
	width: 100%;
	background: ${theme.color.bg.primary};
`;
