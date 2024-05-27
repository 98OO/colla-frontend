import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta = {
	title: 'common/Select',
	component: Select,
	parameters: {
		layout: 'centered',
		componentSubtitle:
			'Select 컴포넌트는 사용자가 여러 옵션 중 하나를 선택할 수 있게 해주는 공용 컴포넌트입니다.',
	},
	decorators: [
		(Story) => (
			<div
				style={{ width: '200px', display: 'flex', justifyContent: 'center' }}>
				<Story />
			</div>
		),
	],

	tags: ['autodocs'],
	argTypes: {
		size: {
			control: {
				type: 'radio',
				options: ['lg', 'md', 'sm'],
				description: 'Select의 크기를 지정합니다.',
			},
		},
		options: {
			control: {
				type: 'object',
			},
			description: 'Select의 옵션들을 지정합니다.',
		},
		select: {
			control: {
				type: 'select',
			},
			description: 'Select의 현재 선택된 값을 지정합니다.',
		},
		setSelect: {
			action: 'setSelect',
			description: 'Select의 값을 변경하는 함수입니다.',
		},
	},
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SelectExample: Story = {
	args: {
		size: 'md',
		options: ['Option 1', 'Option 2', 'Option 3'],
		select: '',
		setSelect: () => {},
	},
	render: (args) => {
		const [select, setSelect] = useState('');

		return (
			<Select
				{...args}
				select={select}
				setSelect={(value) => setSelect(value)}
			/>
		);
	},
};
