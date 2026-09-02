import { ReactComponent as AlignCenterIcon } from '@assets/svg/alignCenter.svg';
import { ReactComponent as AlignLeftIcon } from '@assets/svg/alignLeft.svg';
import { ReactComponent as AlignRightIcon } from '@assets/svg/alignRight.svg';
import { ReactComponent as BlockQuoteIcon } from '@assets/svg/blockQuote.svg';
import { ReactComponent as BoldIcon } from '@assets/svg/bold.svg';
import { ReactComponent as BulletListIcon } from '@assets/svg/bulletList.svg';
import { ReactComponent as CodeIcon } from '@assets/svg/code.svg';
import { ReactComponent as HeadingOneIcon } from '@assets/svg/heading-one.svg';
import { ReactComponent as HeadingThreeIcon } from '@assets/svg/heading-three.svg';
import { ReactComponent as HeadingTwoIcon } from '@assets/svg/heading-two.svg';
import { ReactComponent as ItalicIcon } from '@assets/svg/italic.svg';
import { ReactComponent as OrderedListIcon } from '@assets/svg/orderedList.svg';
import { ReactComponent as StrikeIcon } from '@assets/svg/strike.svg';
import { ReactComponent as UnderlineIcon } from '@assets/svg/underLine.svg';
import type { EditorMenuButtonConfig } from './EditorMenuButton';
import type { Editor } from '@tiptap/react';

export const getBasicButtons = (editor: Editor): EditorMenuButtonConfig[] => [
	{
		id: 'bold',
		icon: BoldIcon,
		command: () => editor.chain().focus().toggleBold().run(),
		isActive: () => editor.isActive('bold'),
	},
	{
		id: 'italic',
		icon: ItalicIcon,
		command: () => editor.chain().focus().toggleItalic().run(),
		isActive: () => editor.isActive('italic'),
	},
	{
		id: 'strike',
		icon: StrikeIcon,
		command: () => editor.chain().focus().toggleStrike().run(),
		isActive: () => editor.isActive('strike'),
	},
	{
		id: 'underline',
		icon: UnderlineIcon,
		command: () => editor.chain().focus().toggleUnderline().run(),
		isActive: () => editor.isActive('underline'),
	},
];

export const getFormatButtons = (editor: Editor): EditorMenuButtonConfig[] => [
	{
		id: 'heading-one',
		icon: HeadingOneIcon,
		command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
		isActive: () => editor.isActive('heading', { level: 1 }),
	},
	{
		id: 'heading-two',
		icon: HeadingTwoIcon,
		command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
		isActive: () => editor.isActive('heading', { level: 2 }),
	},
	{
		id: 'heading-three',
		icon: HeadingThreeIcon,
		command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
		isActive: () => editor.isActive('heading', { level: 3 }),
	},
	{
		id: 'ordered-list',
		icon: OrderedListIcon,
		command: () => editor.chain().focus().toggleOrderedList().run(),
		isActive: () => editor.isActive('orderedList'),
	},
	{
		id: 'bullet-list',
		icon: BulletListIcon,
		command: () => editor.chain().focus().toggleBulletList().run(),
		isActive: () => editor.isActive('bulletList'),
	},
];

export const getAlignButtons = (editor: Editor): EditorMenuButtonConfig[] => [
	{
		id: 'align-left',
		icon: AlignLeftIcon,
		command: () => editor.chain().focus().setTextAlign('left').run(),
		isActive: () => editor.isActive({ textAlign: 'left' }),
	},
	{
		id: 'align-center',
		icon: AlignCenterIcon,
		command: () => editor.chain().focus().setTextAlign('center').run(),
		isActive: () => editor.isActive({ textAlign: 'center' }),
	},
	{
		id: 'align-right',
		icon: AlignRightIcon,
		command: () => editor.chain().focus().setTextAlign('right').run(),
		isActive: () => editor.isActive({ textAlign: 'right' }),
	},
];

export const getUtilityButtons = (editor: Editor): EditorMenuButtonConfig[] => [
	{
		id: 'code',
		icon: CodeIcon,
		command: () => editor.chain().focus().toggleCodeBlock().run(),
		isActive: () => editor.isActive('codeBlock'),
	},
	{
		id: 'block-quote',
		icon: BlockQuoteIcon,
		command: () => editor.chain().focus().toggleBlockquote().run(),
		isActive: () => editor.isActive('blockquote'),
	},
];
