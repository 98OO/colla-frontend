import styled from 'styled-components';
import theme from '@styles/theme';

export const LatestMessageContainer = styled.div`
	display: flex;
	position: absolute;
	cursor: pointer;
	height: 40px;
	left: 10px;
	width: calc(100% - 22px);
	top: calc(100% - 186px);

	padding: 0 ${theme.units.spacing.space10};
	border: 1px solid ${theme.color.border.primary};
	border-radius: ${theme.units.radius.radius8};
	z-index: ${theme.elevation.zIndex.MODAL};
	background-color: ${theme.color.bg.iSecondary};

	/* 간단한 블러 처리 */
	background-color: rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
`;
