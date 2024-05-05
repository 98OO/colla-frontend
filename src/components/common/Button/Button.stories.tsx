import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
	title: 'common/Button',
	component: Button,
	parameters: {
		layout: 'centered',
		componentSubtitle:
			'Button 컴포넌트는 사용자의 상호작용 동작을 트리거하는 공용 컴포넌트입니다.',
	},
	decorators: [
		(Story) => (
			<div
				style={{ width: '360px', display: 'flex', justifyContent: 'center' }}>
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: {
				type: 'text',
			},
			description: 'Button의 text를 지정합니다',
		},
		variant: {
			control: {
				type: 'radio',
				options: ['primary', 'secondary', 'destructive', 'text'],
				description: 'Button의 varaint를 지정합니다.',
			},
		},
		size: {
			control: {
				type: 'radio',
				options: ['lg', 'md', 'sm'],
				description: 'Button의 크기를 지정합니다.',
			},
		},
		isFull: {
			control: 'boolean',
			description: 'Button의 크기를 부모의 크기와 동일하게 지정합니다.',
		},
		disabled: {
			control: 'boolean',
			description: 'Button의 disalbed 여부를 지정합니다.',
		},
		leadingIcon: {
			control: {
				type: 'select',
			},
			description: 'Button의 text 앞에 나타나는 Icon을 표시합니다.',
		},
		onClick: {
			action: 'clicked',
			description: 'Button 클릭 시 호출되는 이벤트 핸들러입니다.',
		},
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonExample: Story = {
	args: {
		label: 'Home',
		variant: 'primary',
		size: 'sm',
		isFull: false,
		disabled: false,
		onClick: () => {},
	},
};
