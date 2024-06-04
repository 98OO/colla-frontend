import styled from 'styled-components';
import { MENU_HEIGHT, GNB_TEAM_INFO_WIDTH } from '@styles/layout';
import theme from '@styles/theme';

export const GNBTeamInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: ${GNB_TEAM_INFO_WIDTH}px;

	background-color: ${theme.color.bg.primary};
	border-radius: ${theme.units.radius.radius8};
	box-shadow: ${theme.elevation.shadow.shadow4};
	z-index: ${theme.elevation.zIndex.MENU};
	gap: ${theme.units.spacing.space8};
	padding: ${theme.units.spacing.space8} 0;
`;

export const InviteContainer = styled.form`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space6};
`;

export const TeamSpaceUserContainer = styled.div`
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

export const InputWrapper = styled.form`
	display: flex;
	width: 216px;

	div {
		width: 100%;
	}
`;

export const FooterWrapper = styled.button`
	display: flex;
	align-items: center;
	border: none;
	background: none;

	gap: ${theme.units.spacing.space8};

	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};
	}
`;
