import { MutableRefObject } from 'react';
import EditorMenu from '@components/Post/EditorMenu/EditorMenu';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent, Editor as EditorType } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import theme from '@styles/theme';
import * as S from './Editor.styled';

interface EditorProps {
	editorRef: MutableRefObject<EditorType | null>;
	appendImageFile: (file: File) => void;
}

const Editor = ({ editorRef, appendImageFile }: EditorProps) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				dropcursor: { color: theme.color.border.infoSubtle, width: 2 },
			}),
			Underline,
			Image,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
		],
	});

	if (!editor) return null;

	if (editorRef.current !== editor) {
		// eslint-disable-next-line no-param-reassign
		editorRef.current = editor;
	}

	return (
		<S.EditorContainer>
			<EditorMenu editor={editor} appendImageFile={appendImageFile} />
			<EditorContent editor={editor} />
		</S.EditorContainer>
	);
};

export default Editor;
