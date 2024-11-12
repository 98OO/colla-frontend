import EditorMenuButton from '@components/Post/EditorMenuButton/EditorMenuButton';
import {
	getBasicButtons,
	getFormatButtons,
	getAlignButtons,
	getUtilityButtons,
} from '@components/Post/EditorMenuButton/getButtons';
import type { Editor } from '@tiptap/react';
import * as S from './EditorMenu.styled';

interface EditorMenuProps {
	editor: Editor;
}

const EditorMenu = ({ editor }: EditorMenuProps) => {
	const buttonGroups = [
		getBasicButtons(editor),
		getFormatButtons(editor),
		getAlignButtons(editor),
		getUtilityButtons(editor),
	];

	return (
		<S.EditorMenuContainer>
			{buttonGroups.map((group) => (
				<>
					{group.map((button) => (
						<EditorMenuButton
							key={button.icon}
							icon={button.icon}
							command={button.command}
							isActive={button.isActive}
						/>
					))}
					<S.EditorMenuDivider />
				</>
			))}
		</S.EditorMenuContainer>
	);
};

export default EditorMenu;
