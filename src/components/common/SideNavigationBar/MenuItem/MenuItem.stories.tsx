import type { Meta, StoryObj } from '@storybook/react';
import MenuItem from './MenuItem';

const meta = {
	title: 'common/MenuItem',
	component: MenuItem,
	parameters: {
		layout: 'centered',
		componentSubtitle: '사용자의 메뉴 아이템을 나타내는 컴포넌트입니다.',
	},
	argTypes: {
		leadingIcon: {
			control: {
				type: 'select',
			},
			description: '메뉴 아이템 앞에 표시되는 아이콘입니다.',
		},
		title: {
			control: {
				type: 'text',
			},
			description: '메뉴 아이템의 제목입니다.',
		},
		selected: {
			control: 'boolean',
			description: '메뉴 아이템이 선택되었는지 여부를 나타냅니다.',
		},
		number: {
			control: {
				type: 'number',
				min: 0,
			},
			description: '메뉴 아이템에 표시되는 숫자입니다.',
		},
		type: {
			control: {
				type: 'select',
				options: ['default', 'iconOnly'],
			},
			description: '메뉴 아이템의 유형을 설정합니다.',
		},
		onClick: {
			action: 'clicked',
			description: '메뉴 아이템을 클릭했을 때 호출되는 이벤트 핸들러입니다.',
		},
	},
} satisfies Meta<typeof MenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		leadingIcon: 'Home',
		title: 'Menu Item',
		selected: false,
		number: 0,
		type: 'default',
		onClick: () => {},
	},
};
