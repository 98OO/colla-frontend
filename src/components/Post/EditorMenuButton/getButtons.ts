import type { ButtonProps } from './EditorMenuButton';
import type { Editor } from '@tiptap/react';

export const getBasicButtons = (editor: Editor): ButtonProps[] => [
	{
		icon: 'Bold',
		command: () => editor.chain().focus().toggleBold().run(),
		isActive: () => editor.isActive('bold'),
	},
	{
		icon: 'Italic',
		command: () => editor.chain().focus().toggleItalic().run(),
		isActive: () => editor.isActive('italic'),
	},
	{
		icon: 'Strike',
		command: () => editor.chain().focus().toggleStrike().run(),
		isActive: () => editor.isActive('strike'),
	},
];
