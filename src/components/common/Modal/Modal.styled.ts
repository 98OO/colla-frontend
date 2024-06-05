import styled from 'styled-components';
import theme from '@styles/theme';

export const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	z-index: ${theme.elevation.zIndex.MODAL};
`;

export const ModalWrapper = styled.div`
	background: ${theme.color.bg.primary};
	border-radius: ${theme.units.radius.radius8};
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;
