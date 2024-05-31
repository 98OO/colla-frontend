import styled from 'styled-components';
import { MENU_HEIGHT } from '@styles/layout';
import theme from '@styles/theme';

export const GNBTeamSpaceContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 320px;

	background-color: ${theme.color.bg.primary};
	border-radius: ${theme.units.radius.radius8};
	box-shadow: ${theme.elevation.shadow.shadow4};
	z-index: ${theme.elevation.zIndex.MENU};
	gap: ${theme.units.spacing.space8};
	padding: ${theme.units.spacing.space8} 0;
`;

export const TeamSpacesWrapper = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: auto;

	max-height: ${MENU_HEIGHT};
	padding-right: ${theme.units.spacing.space10};
	gap: ${theme.units.spacing.space8};

	&::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: ${theme.units.radius.radius20};
		background: ${theme.color.border.secondary};
	}
`;

export const FooterContainer = styled.button`
	display: flex;
	align-items: center;
	border: none;
	background: none;
	width: 100%;

	gap: ${theme.units.spacing.space8};

	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};
	}
`;
