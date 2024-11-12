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

export const getFormatButtons = (editor: Editor): ButtonProps[] => [
	{
		icon: 'HeadingOne',
		command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
		isActive: () => editor.isActive('heading', { level: 1 }),
	},
	{
		icon: 'HeadingTwo',
		command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
		isActive: () => editor.isActive('heading', { level: 2 }),
	},
	{
		icon: 'HeadingThree',
		command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
		isActive: () => editor.isActive('heading', { level: 3 }),
	},
];

export const getAlignButtons = (editor: Editor): ButtonProps[] => [
	{
		icon: 'AlignLeft',
		command: () => editor.chain().focus().setTextAlign('left').run(),
		isActive: () => editor.isActive({ textAlign: 'left' }),
	},
	{
		icon: 'AlignCenter',
		command: () => editor.chain().focus().setTextAlign('center').run(),
		isActive: () => editor.isActive({ textAlign: 'center' }),
	},
	{
		icon: 'AlignRight',
		command: () => editor.chain().focus().setTextAlign('right').run(),
		isActive: () => editor.isActive({ textAlign: 'right' }),
	},
];
