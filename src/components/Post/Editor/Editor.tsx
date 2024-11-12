import EditorMenu from '@components/Post/EditorMenu/EditorMenu';
import TextAlign from '@tiptap/extension-text-align';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import * as S from './Editor.styled';

const Editor = () => {
	const editor = useEditor({
		extensions: [
			StarterKit,
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
