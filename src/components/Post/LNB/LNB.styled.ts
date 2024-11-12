import styled from 'styled-components';
import theme from '@styles/theme';

export const LNBContainer = styled.nav`
	display: flex;
	width: 680px;
	height: ${theme.units.spacing.space48};
	cursor: pointer;
`;

export const LNBItemContainer = styled.div<{ active?: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	/* width: 170px; */
	width: 260px;
	height: ${theme.units.spacing.space40};
	border-bottom: 2px solid
		${({ active }) =>
			active ? theme.color.border.iPrimary : theme.color.border.tertiary};
	font-weight: ${({ active }) =>
		active
			? theme.typography.fontWeight.semiBold
			: theme.typography.fontWeight.regular};

	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};
		transition: background-color 0.2s ease-in-out;
	}
`;
