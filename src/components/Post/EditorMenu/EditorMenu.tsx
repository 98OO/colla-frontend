import Icon from '@components/common/Icon/Icon';
import type { Editor } from '@tiptap/react';
import * as S from './EditorMenu.styled';

interface EditorMenuProps {
	editor: Editor;
}

const EditorMenu = ({ editor }: EditorMenuProps) => {
	return (
		<S.EditorMenuContainer>
			<S.EditorMenuButton type='button' onClick={() => editor}>
				<Icon name='Home' size='md' color='primary' />
			</S.EditorMenuButton>
		</S.EditorMenuContainer>
	);
};

export default EditorMenu;
