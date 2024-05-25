import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './Avatar';

const meta: Meta = {
	title: 'common/Avatar',
	component: Avatar,
	parameters: {
		layout: 'centered',
		componentSubtitle:
			'Avatar 컴포넌트는 프로필 이미지를 나타내는 공용 컴포넌트입니다.',
	},
	tags: ['autodocs'],
	argTypes: {
		profile: {
			control: {
				type: 'text',
			},
			description: '프로필 이미지 URL을 지정합니다.',
		},
		initial: {
			control: {
				type: 'text',
			},
			description: '프로필 이미지가 없을 경우 표시할 초기 문자를 지정합니다.',
		},
		size: {
			control: {
				type: 'select',
				options: ['xl', 'lg', 'md', 'sm', 'xs'],
			},
			description: '아바타의 크기를 지정합니다.',
		},
		shape: {
			control: {
				type: 'radio',
				options: ['circle', 'rect'],
			},
			description: '아바타의 모양을 지정합니다.',
		},
	},
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CircleAvatar: Story = {
	args: {
		profile: null,
		initial: '하이요',
		size: 'lg',
		shape: 'circle',
	},
};
