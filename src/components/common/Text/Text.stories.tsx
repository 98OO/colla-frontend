import Text from '@components/common/Text/Text';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'common/Text',
	component: Text,
	parameters: {
		layout: 'centered',
		componentSubtitle:
			'Text는 태그, 크기, 두께, 색상을 받아 본문의 텍스트를 나타내는 공용 컴포넌트입니다.',
	},
	tags: ['autodocs'],
	argTypes: {
		as: {
			control: {
				type: 'radio',
				options: ['p', 'span', 'strong', 'small'],
			},
			description: '렌더링할 HTML 태그',
			defaultValue: 'p',
		},
		size: {
			control: {
				type: 'radio',
				options: ['lg', 'md', 'sm'],
			},
			description: '텍스트의 글꼴 크기',
		},
		weight: {
			control: {
				type: 'radio',
				options: ['regular', 'medium', 'semiBold', 'bold'],
			},
			description: '텍스트의 글꼴 두께',
		},
		color: {
			control: {
				type: 'select',
			},
			description: '텍스트의 색상',
			defaultValue: 'primary',
		},
		children: {
			control: { type: 'text' },
		},
	},
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LgBoldPrimary: Story = {
	args: {
		size: 'lg',
		weight: 'bold',
		children: 'Text 컴포넌트',
		color: 'primary',
	},
};

export const MdMediumSubtle: Story = {
	args: {
		size: 'md',
		weight: 'medium',
		children: 'Text 컴포넌트',
		color: 'subtle',
	},
};

export const SmRegularDanger: Story = {
	args: {
		size: 'sm',
		weight: 'regular',
		children: 'Text 컴포넌트',
		color: 'danger',
	},
};
