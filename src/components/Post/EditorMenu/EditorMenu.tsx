import {
	EditorMenuButton,
	EditorMenuImageButton,
} from '@components/Post/EditorMenuButton/EditorMenuButton';
import {
	getBasicButtons,
	getFormatButtons,
	getAlignButtons,
	getUtilityButtons,
} from '@components/Post/EditorMenuButton/getButtons';
import { convertToBase64 } from '@utils/editorImageUtils';
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

	const addImageToEditor = async (file: File) => {
		const imageUrl = await convertToBase64(file);

		if (imageUrl) {
			editor.chain().focus().setImage({ src: imageUrl }).run();
		}
	};

	const handleEditorImage = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];

		if (!file) return;

		addImageToEditor(file);
	};

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
			<EditorMenuImageButton onChange={handleEditorImage} />
		</S.EditorMenuContainer>
	);
};

export default EditorMenu;
