import { useState } from 'react';
import { formatDate } from '@utils/calendar/formatDate';
import { expect, fireEvent, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { DateString } from '@type/post';
import Calendar from './Calendar';

const meta: Meta<typeof Calendar> = {
	title: 'Components/Post/SchedulingPost/Calendar',
	component: Calendar,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'일정 조율 피드 작성 시 날짜 다중 선택 및 드래그를 지원하는 달력 컴포넌트입니다.',
			},
		},
	},
	argTypes: {
		selectedDates: { control: false, description: '선택된 날짜들의 Set 객체' },
		setSelectedDates: { description: '날짜 선택 상태를 변경하는 함수' },
	},
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const CalendarStateWrapper = ({ initialDates = [] }: { initialDates?: string[] }) => {
	const [selectedDates, setSelectedDates] = useState<Set<DateString>>(
		new Set(initialDates as DateString[])
	);

	return <Calendar selectedDates={selectedDates} setSelectedDates={setSelectedDates} />;
};

// --- Visual states ---

export const Default: Story = {
	render: () => <CalendarStateWrapper />,
};

export const WithSelectedDates: Story = {
	render: () => {
		const today = new Date();
		const tomorrow = new Date();
		tomorrow.setDate(today.getDate() + 1);

		return <CalendarStateWrapper initialDates={[formatDate(today), formatDate(tomorrow)]} />;
	},
};

// --- Interaction tests ---

export const ClickSelect: Story = {
	render: () => <CalendarStateWrapper />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByLabelText('nextMonth'));
		const cell = canvas.getByText('1');

		await userEvent.click(cell);
		await expect(cell).toHaveAttribute('aria-selected', 'true');

		await userEvent.click(cell);
		await expect(cell).toHaveAttribute('aria-selected', 'false');
	},
};

export const DragSelect: Story = {
	render: () => <CalendarStateWrapper />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByLabelText('nextMonth'));
		const startCell = canvas.getByText('1');
		const midCell = canvas.getByText('2');
		const endCell = canvas.getByText('3');

		fireEvent.pointerDown(startCell);
		fireEvent.pointerOver(midCell);
		fireEvent.pointerOver(endCell);
		fireEvent.pointerUp(endCell);

		await expect(startCell).toHaveAttribute('aria-selected', 'true');
		await expect(midCell).toHaveAttribute('aria-selected', 'true');
		await expect(endCell).toHaveAttribute('aria-selected', 'true');
	},
};
