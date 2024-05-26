import type { Meta, StoryObj } from '@storybook/react';
import Profile from './Profile';

const meta = {
	title: 'common/Profile',
	component: Profile,
	parameters: {
		layout: 'centered',
		componentSubtitle:
			'Profile 컴포넌트는 사용자 정보를 표시하는 공용 컴포넌트입니다.',
	},
	decorators: [
		(Story) => (
			<div
				style={{ width: '300px', display: 'flex', justifyContent: 'center' }}>
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
	argTypes: {
		profile: {
			control: 'text',
			description: '프로필 이미지 URL을 지정합니다.',
		},
		initial: {
			control: 'text',
			description: '프로필 이미지가 없는 경우 표시할 초기 문자를 지정합니다.',
		},
		title: {
			control: 'text',
			description: '프로필의 제목을 지정합니다.',
		},
		subTitle: {
			control: 'text',
			description: '프로필의 부제목을 지정합니다.',
		},
		text: {
			control: 'text',
			description: '프로필의 추가 텍스트를 지정합니다.',
		},
		trailingIcon: {
			control: {
				type: 'select',
			},
			description: '프로필 끝에 표시할 아이콘을 지정합니다.',
		},
		trailingText: {
			control: 'text',
			description: '프로필 끝에 표시할 텍스트를 지정합니다.',
		},
	},
} satisfies Meta<typeof Profile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultProfile: Story = {
	args: {
		profile: null,
		initial: '팀',
		title: '홍길동',
		subTitle: 'Leader',
		text: '안녕하세요',
		trailingIcon: 'Home',
		trailingText: 'More info',
	},
};
