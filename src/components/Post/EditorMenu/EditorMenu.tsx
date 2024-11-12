import Icon from '@components/common/Icon/Icon';
import type { Editor } from '@tiptap/react';
import * as S from './EditorMenu.styled';

interface EditorMenuProps {
	editor: Editor;
}

const EditorMenu = ({ editor }: EditorMenuProps) => {
	return (
		<S.EditorMenuContainer>
			<S.EditorMenuButton
				type='button'
				onClick={() => editor.chain().focus().toggleBold().run()}>
				<Icon
					name='Bold'
					size='md'
					color={editor.isActive('bold') ? 'iPrimary' : 'primary'}
				/>
			</S.EditorMenuButton>
			<S.EditorMenuButton
				type='button'
				onClick={() => editor.chain().focus().toggleItalic().run()}>
				<Icon
					name='Italic'
					size='md'
					color={editor.isActive('italic') ? 'iPrimary' : 'primary'}
				/>
			</S.EditorMenuButton>
		</S.EditorMenuContainer>
	);
};

export default EditorMenu;
