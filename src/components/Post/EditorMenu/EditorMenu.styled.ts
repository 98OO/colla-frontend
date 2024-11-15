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

export const EditorMenuDivider = styled.div`
	width: 1px;
	height: ${theme.units.spacing.space20};
	background-color: ${theme.color.border.primary};
	margin: 0 ${theme.units.spacing.space8};
`;
