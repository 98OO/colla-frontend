import { useState } from 'react';
import { formatDate } from '@utils/calendar/formatDate';
import { DateManager } from '@utils/common/DateManager';
import { DEFAULT_DUE_TIME } from '@constants/post';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { DateString, TimeString } from '@type/post';
import DatePicker from './DatePicker';

const meta = {
	title: 'Components/Post/DatePicker',
	component: DatePicker,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'날짜와 시각을 함께 선택하는 컴포넌트입니다. 날짜는 달력에서, 시각은 30분 단위 옵션에서 선택하며 선택 가능한 시간이 없는 날짜는 비활성화됩니다.',
			},
		},
	},
	decorators: [
		(Story) => (
			<div style={{ minHeight: '360px' }}>
				<Story />
			</div>
		),
	],
	argTypes: {
		selectedDate: { control: false, description: '선택된 날짜 (YYYY-MM-DD)' },
		time: { control: false, description: '선택된 시각 (HH:MM)' },
		onDateChange: { description: '날짜를 변경하는 함수' },
		onTimeChange: { description: '시각을 변경하는 함수' },
	},
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

interface DatePickerStateWrapperProps {
	initialDate?: DateString;
	initialTime?: TimeString;
}

const getFutureDate = (daysFromNow: number) => {
	return DateManager.getDateAfter(new Date(), { days: daysFromNow });
};

const DatePickerStateWrapper = ({
	initialDate = formatDate(getFutureDate(1)),
	initialTime = DEFAULT_DUE_TIME,
}: DatePickerStateWrapperProps) => {
	const [selectedDate, setSelectedDate] = useState<DateString>(initialDate);
	const [time, setTime] = useState<TimeString>(initialTime);

	return (
		<DatePicker
			selectedDate={selectedDate}
			time={time}
			onDateChange={setSelectedDate}
			onTimeChange={setTime}
		/>
	);
};

export const Default: Story = {
	render: () => <DatePickerStateWrapper />,
};
