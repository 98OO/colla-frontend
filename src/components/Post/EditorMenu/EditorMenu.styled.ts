import styled from 'styled-components';
import theme from '@styles/theme';

export const EditorMenuContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: ${theme.units.spacing.space48};
	border: 1px solid ${theme.color.border.primary};
	gap: ${theme.units.spacing.space4};
	padding: ${theme.units.spacing.space8};
`;

export const EditorMenuButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${theme.units.spacing.space32};
	height: ${theme.units.spacing.space32};
	font-size: ${theme.typography.fontSize.body.lg};
	border: none;
	border-radius: ${theme.units.radius.radius4};
	background-color: ${theme.color.bg.primary};
	cursor: pointer;

	&:hover {
		color: ${theme.color.text.iPrimary};
		background-color: ${theme.color.bg.iSecondary};
	}
`;
