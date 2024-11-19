import { styled } from 'styled-components';
import { editorStyles } from '@styles/editorStyles';
import theme from '@styles/theme';

export const EditorContainer = styled.form<{ heightOffset?: number }>`
	border-radius: 0;
	display: flex;
	flex-direction: column;
	width: 100%;

	.tiptap {
		min-height: 230px;
		max-height: ${({ heightOffset = 600 }) =>
			`calc(100dvh - ${heightOffset}px)`};
		overflow-y: auto;
		padding: ${theme.units.spacing.space12};
		padding-bottom: ${theme.units.spacing.space36};
		border: 1px solid ${theme.color.border.primary};
		border-top: none;
		${editorStyles}
	}
`;
