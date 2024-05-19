import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta = {
	title: 'common/Badge',
	component: Badge,
	parameters: {
		layout: 'centered',
		componentSubtitle:
			'Badge 컴포넌트는 상태, 알림 또는 숫자 정보를 표시하는 컴포넌트입니다.',
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: {
				type: 'select',
				options: ['dot', 'number', 'letter'],
			},
			description: 'Badge의 종류를 지정합니다.',
		},
		status: {
			control: {
				type: 'select',
				options: ['info', 'warning', 'success', 'important'],
			},
			description: 'Badge의 상태를 지정합니다.',
		},
		number: {
			control: {
				type: 'number',
				min: 0,
			},
			description: 'Badge에 표시될 숫자를 지정합니다.',
			if: { arg: 'type', neq: 'dot' },
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BadgeExample: Story = {
	args: {
		type: 'dot',
		status: 'info',
		number: 5,
	},
};
