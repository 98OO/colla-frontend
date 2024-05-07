import Input from '@components/common/Input/Input';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'common/Input',
	component: Input,
	parameters: {
		layout: 'centered',
		componentSubtitle:
			'Input 컴포넌트는 사용자로부터 정보를 입력받을 수 있는 입력 필드를 생성하는 공용 컴포넌트입니다.',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: {
				type: 'radio',
				options: ['lg', 'md', 'sm'],
			},
			description: 'Input의 크기를 지정합니다.',
		},
		border: {
			control: {
				type: 'radio',
			},
			description: 'Input의 border 스타일을 지정합니다.',
			defaultValue: 'default',
		},
		isError: {
			control: {
				type: 'boolean',
			},
			description: 'Input의 오류 여부를 지정합니다.',
		},
		trailingIcon: {
			control: {
				type: 'select',
			},
			description: 'Input의 입력 필드 뒤에 나타나는 Icon을 표시합니다.',
		},
		trailingIconColor: {
			control: {
				type: 'select',
			},
			description: 'Input의 입력 필드 뒤에 나타나는 Icon의 색상을 지정합니다.',
		},
		placeholder: {
			control: {
				type: 'text',
			},
			description: 'Input의 입력 필드에 표시되는 임시 텍스트를 지정합니다.',
		},
		type: {
			control: {
				type: 'select',
			},
			description: 'Input의 입력 필드의 타입을 지정합니다.',
		},
		value: {
			control: {
				type: 'text',
			},
			description: 'Input의 입력 필드의 현재 값을 지정합니다.',
			defaultValue: '',
		},
		onChange: {
			action: 'changed',
			description:
				'Input의 입력 필드 값이 변경될 때 호출되는 이벤트 핸들러입니다.',
		},
	},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextField: Story = {
	args: {
		size: 'md',
		border: 'default',
		isError: false,
		type: 'text',
		value: '',
		onChange: () => {},
	},
};
