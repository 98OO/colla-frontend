import type { Meta, StoryObj } from '@storybook/react';
import Divider from './Divider';

const meta: Meta = {
	title: 'common/Divider',
	component: Divider,
	parameters: {
		layout: 'centered',
		componentSubtitle:
			'Divider 컴포넌트는 컨텐츠를 구분하는 선을 나타내는 컴포넌트입니다.',
	},
	decorators: [
		(Story) => (
			<div style={{ width: '360px' }}>
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: {
				type: 'select',
				options: ['xl', 'lg', 'md', 'sm'],
			},
			description: 'Divider의 크기를 지정합니다.',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SmallDivider: Story = {
	args: {
		size: 'sm',
	},
};

export const MediumDivider: Story = {
	args: {
		size: 'md',
	},
};

export const LargeDivider: Story = {
	args: {
		size: 'lg',
	},
};

export const ExtraLargeDivider: Story = {
	args: {
		size: 'xl',
	},
};
