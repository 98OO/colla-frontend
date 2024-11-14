import styled from 'styled-components';
import theme from '@styles/theme';

export const DrawerContainer = styled.div<{ isOpen: boolean }>`
	position: fixed;
	top: 0;
	right: 0;
	width: 0;
	height: 100%;
	overflow: hidden;
	transition: width 0.3s ease-in-out;
	z-index: 1000;
	display: flex;
	box-shadow:
		rgba(15, 15, 15, 0.04) 0px 0px 0px 1px,
		rgba(15, 15, 15, 0.03) 0px 3px 6px,
		rgba(15, 15, 15, 0.06) 0px 9px 24px;

	&.open {
		width: 800px;
	}
`;

export const DrawerMenu = styled.div`
	display: flex;
	height: 64px;
	align-items: center;
	padding: ${theme.units.spacing.space8} ${theme.units.spacing.space24};
	border-bottom: 1px solid ${theme.color.border.primary};
`;

export const DrawerContent = styled.div`
	width: 100%;
	background: ${theme.color.bg.primary};
	padding-bottom: ${theme.units.spacing.space32};
`;
