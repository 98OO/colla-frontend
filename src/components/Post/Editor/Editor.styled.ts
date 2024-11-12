import { styled } from 'styled-components';
import { editorStyles } from '@styles/editorStyles';
import theme from '@styles/theme';

export const EditorContainer = styled.form`
	display: flex;
	flex-direction: column;
	width: 680px;
	min-height: 400px;
	border-radius: 8px;

	.tiptap {
		min-height: 400px;
		max-height: 800px;
		overflow-y: auto;
		padding: ${theme.units.spacing.space12};
		padding-bottom: ${theme.units.spacing.space36};
		border: 1px solid ${theme.color.border.primary};
		border-top: none;

		${editorStyles}
	}
`;
