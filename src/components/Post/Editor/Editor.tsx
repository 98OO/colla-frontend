import EditorMenu from '@components/Post/EditorMenu/EditorMenu';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import * as S from './Editor.styled';

const Editor = () => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Image,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
		],
		content: 'editor content',
	});

	if (!editor) return null;

	return (
		<S.EditorContainer>
			<EditorMenu editor={editor} />
			<EditorContent editor={editor} />
		</S.EditorContainer>
	);
};

export default Editor;
