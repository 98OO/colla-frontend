import { styled } from 'styled-components';
import theme from '@styles/theme';

export const CollectPostContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 680px;
	gap: ${theme.units.spacing.space32};
`;

export const PostInput = styled.input`
	font-size: ${theme.typography.fontSize.header.sm};
	font-weight: ${theme.typography.fontWeight.semiBold};
	border: none;
	outline: none;
`;

export const EditorContainer = styled.div`
	max-height: calc(100vh - 500px);
	overflow-x: hidden;
`;

export const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
	gap: ${theme.units.spacing.space16};
`;
