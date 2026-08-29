import { ReactComponent as HomeIcon } from '@assets/svg/home.svg';
import Icon from '@components/common/Icon/Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'common/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
		componentSubtitle:
			'Icon은 SVG 컴포넌트, 색상, 크기를 받아 아이콘을 나타내는 공용 컴포넌트입니다.',
	},
	argTypes: {
		icon: {
			control: false,
			description: '표시할 SVG 컴포넌트입니다.',
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
		icon: HomeIcon,
		size: 'lg',
		color: 'primary',
	},
};
