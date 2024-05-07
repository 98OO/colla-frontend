import Icon from '@components/common/Icon/Icon';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'common/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
		componentSubtitle:
			'Icon은 이름, 색상, 크기를 받아 아이콘을 나타내는 공용 컴포넌트입니다.',
	},
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: 'select',
			description: '사용할 Icon의 이름입니다.',
		},
		size: {
			control: {
				type: 'radio',
				options: ['xl', 'lg', 'md', 'sm'],
			},
			description: 'Icon의 크기를 지정합니다.',
		},
		color: {
			control: {
				type: 'select',
			},
			description: 'Icon의 텍스트 색상을 지정합니다.',
			defaultValue: 'primary',
		},
	},
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {
	args: {
		name: 'Home',
		size: 'lg',
		color: 'primary',
	},
};
