import { useState } from 'react';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import DatePicker from '@components/Post/DatePicker/DatePicker';
import type { DateString, SchedulingCondition, Time } from '@type/post';
import * as S from '../SchedulingPost.styled';

interface DueAtSectionProps {
	initialDueAtDate: DateString;
	initialDueAtTime: Time | null;
	updateCondition: (patch: Partial<SchedulingCondition>) => void;
}

const DueAtSection = ({
	initialDueAtDate,
	initialDueAtTime,
	updateCondition,
}: DueAtSectionProps) => {
	const [selectedDate, setSelectedDate] = useState<DateString>(initialDueAtDate);
	const [time, setTime] = useState<Time | null>(initialDueAtTime);

	const handleDateChange = (newDate: DateString) => {
		setSelectedDate(newDate);
		updateCondition({ dueAtDate: newDate });
	};

	const handleTimeChange = (newTime: Time | null) => {
		setTime(newTime);
		updateCondition({ dueAtTime: newTime });
	};

	return (
		<Flex direction='column' gap='20'>
			<Flex align='center' gap='6'>
				<Icon name='Clock' />
				<Heading size='xs' color='secondary'>
					마감 일시
				</Heading>
			</Flex>
			<Text size='md' weight='regular' color='tertiary'>
				일정 조율이 마감될 일시를 선택해주세요
			</Text>
			<S.DatePickerWrapper>
				<DatePicker
					selectedDate={selectedDate}
					onDateChange={handleDateChange}
					time={time}
					onTimeChange={handleTimeChange}
				/>
			</S.DatePickerWrapper>
		</Flex>
	);
};

export default DueAtSection;
