import styled from 'styled-components';
import theme from '@styles/theme';

export const GNBContainer = styled.div`
	width: 100vw;
	height: 64px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid ${theme.color.border.primary};
	padding: ${theme.units.spacing.space8} ${theme.units.spacing.space24};
`;

export const LeftContainer = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.units.spacing.space8};

	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};
	}
`;

export const RightContainer = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.units.spacing.space16};
`;

export const ProfileContainer = styled.div`
	display: flex;
	gap: ${theme.units.spacing.space24};
`;
