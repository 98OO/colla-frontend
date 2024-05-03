import IconButton from '@components/common/IconButton/IconButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'common/IconButton',
	component: IconButton,
	parameters: {
		layout: 'centered',
		componentSubtitle:
			'IconButton은 이름, 라벨, 색상, 크기를 받아 아이콘 형태의 버튼을 나타내는 공용 컴포넌트입니다.',
	},
	tags: ['autodocs'],
	argTypes: {
		icon: {
			control: 'select',
			description: '사용할 Icon의 이름입니다.',
		},
		ariaLabel: {
			control: 'text',
			description: '스크린 리더에서 IconButton의 목적을 설명하는 라벨입니다.',
		},
		color: {
			control: {
				type: 'select',
			},
			description: 'IconButton의 색상을 지정합니다.',
			defaultValue: 'primary',
		},
		size: {
			control: {
				type: 'radio',
				options: ['xl', 'lg', 'md', 'sm'],
			},
			description: 'IconButton의 크기를 지정합니다.',
		},
		onClick: {
			action: 'clicked',
			description: 'IconButton이 클릭되었을 때 호출되는 콜백 함수입니다.',
		},
	},
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Eye: Story = {
	args: {
		icon: 'Eye',
		ariaLabel: '비밀번호 숨김',
		color: 'tertiary',
		size: 'lg',
		onClick: () => {},
	},
};

export const EyeOff: Story = {
	args: {
		icon: 'EyeOff',
		ariaLabel: '비밀번호 확인',
		color: 'tertiary',
		size: 'lg',
		onClick: () => {},
	},
};
