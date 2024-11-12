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
