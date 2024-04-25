import Heading from '@components/common/Heading/Heading';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'common/Heading',
	component: Heading,
	parameters: {
		layout: 'centered',
		componentSubtitle:
			'Heading는 크기, 색상을 받아 제목의 텍스트를 나타내는 공용 컴포넌트입니다.',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: {
				type: 'radio',
				options: ['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs'],
			},
			description: 'Heading의 텍스트 크기를 지정합니다.',
		},
		color: {
			control: {
				type: 'select',
			},
			description: 'Heading의 텍스트 색상을 지정합니다.',
			defaultValue: 'primary',
		},
		children: {
			control: { type: 'text' },
			description: 'Heading에 표시할 텍스트를 입력합니다.',
		},
	},
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const XXL: Story = {
	args: {
		size: 'xxl',
		children: 'Heading 컴포넌트',
		color: 'primary',
	},
};

export const MD: Story = {
	args: {
		size: 'md',
		children: 'Heading 컴포넌트',
		color: 'info',
	},
};
