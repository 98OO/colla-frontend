import EditorMenuButton from '@components/Post/EditorMenuButton/EditorMenuButton';
import {
	getBasicButtons,
	getFormatButtons,
} from '@components/Post/EditorMenuButton/getButtons';
import type { Editor } from '@tiptap/react';
import * as S from './EditorMenu.styled';

interface EditorMenuProps {
	editor: Editor;
}

const EditorMenu = ({ editor }: EditorMenuProps) => {
	const basicButtons = getBasicButtons(editor);
	const formatButtons = getFormatButtons(editor);

	return (
		<S.EditorMenuContainer>
			{basicButtons.map((button) => (
				<EditorMenuButton
					key={button.icon}
					icon={button.icon}
					command={button.command}
					isActive={button.isActive}
				/>
			))}
			<S.EditorMenuDivider />
			{formatButtons.map((button) => (
				<EditorMenuButton
					key={button.icon}
					icon={button.icon}
					command={button.command}
					isActive={button.isActive}
				/>
			))}
		</S.EditorMenuContainer>
	);
};

export default EditorMenu;
