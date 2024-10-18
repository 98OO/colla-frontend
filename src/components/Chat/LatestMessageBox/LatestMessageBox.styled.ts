import styled from 'styled-components';
import theme from '@styles/theme';

export const LatestMessageContainer = styled.div`
	display: flex;
	position: absolute;
	cursor: pointer;
	height: 34px;
	left: 22px;
	opacity: 0.9;
	width: calc(100% - 44px);
	top: calc(100% - 175px);

	padding: 0 ${theme.units.spacing.space10};
	border: 1px solid ${theme.color.border.primary};
	border-radius: ${theme.units.radius.radius8};
	z-index: ${theme.elevation.zIndex.MODAL};
	background-color: ${theme.color.bg.iSecondary};

	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};

		div {
			background-color: ${theme.color.bg.iSecondaryHover};
		}
	}
`;
