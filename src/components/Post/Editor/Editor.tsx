import EditorMenu from '@components/Post/EditorMenu/EditorMenu';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import * as S from './Editor.styled';

interface EditorProps {
	appendImageFile: (file: File) => void;
}

const Editor = ({ appendImageFile }: EditorProps) => {
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
			<EditorMenu editor={editor} appendImageFile={appendImageFile} />
			<EditorContent editor={editor} />
		</S.EditorContainer>
	);
};

export default Editor;
