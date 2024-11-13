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
import useFileUpload from '@hooks/common/useFileUpload';
import useToastStore from '@stores/toastStore';
import { convertToBase64 } from '@utils/editorImageUtils';
import { EDITOR_IMAGE_ERROR_MESSAGE } from '@constants/feed';
import type { Editor } from '@tiptap/react';
import * as S from './EditorMenu.styled';

interface EditorMenuProps {
	editor: Editor;
}

const EditorMenu = ({ editor }: EditorMenuProps) => {
	const { isFileSizeExceedLimit } = useFileUpload();
	const { makeToast } = useToastStore();

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

		if (!file) {
			makeToast(EDITOR_IMAGE_ERROR_MESSAGE.NO_FILE_SELECTED, 'Warning');
			return;
		}

		if (isFileSizeExceedLimit(file)) {
			makeToast(EDITOR_IMAGE_ERROR_MESSAGE.EXCEED_LIMIT, 'Warning');
			return;
		}

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
