import Team from '@components/Team/Team';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Test/Team',
	component: Team,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Team>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
