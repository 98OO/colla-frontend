import { useState } from 'react';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import Select from '@components/common/Select/Select';
import Text from '@components/common/Text/Text';
import { filterTimeOptions } from '@utils/post/scheduling/timeOptionUtils';
import type { SchedulingCondition, TimeRange, TimeString } from '@type/post';
import * as S from '../SchedulingPost.styled';

interface TimeRangeProps {
	initialTimeRange: TimeRange;
	updateCondition: (patch: Partial<SchedulingCondition>) => void;
}

const TimeRangeSection = ({ initialTimeRange, updateCondition }: TimeRangeProps) => {
	const [timeRange, setTimeRange] = useState<TimeRange>(initialTimeRange);

	const handleTimeRange = (bound: keyof TimeRange, time: TimeString) => {
		setTimeRange((prev) => {
			const updated = { ...prev, [bound]: time };
			updateCondition({ timeRange: updated });
			return updated;
		});
	};

	const fromTimeOptions = filterTimeOptions(timeRange.to, 'earlier');
	const toTimeOptions = filterTimeOptions(timeRange.from, 'later');

	return (
		<Flex direction='column' gap='20'>
			<Flex align='center' gap='6'>
				<Icon name='Calendar' />
				<Heading size='xs' color='secondary'>
					시간 범위
				</Heading>
			</Flex>
			<Text size='md' weight='regular' color='tertiary'>
				일정이 이뤄진 시간 범위를 선택해주세요
			</Text>
			<S.TimePickerContainer>
				<S.TimePickerWrapper>
					<S.SelectedWrapper>
						<Select
							size='sm'
							options={fromTimeOptions}
							select={timeRange.from}
							setSelect={(idx) => handleTimeRange('from', fromTimeOptions[idx - 1])}
						/>
					</S.SelectedWrapper>
					<Text size='md' weight='regular'>
						부터
					</Text>
				</S.TimePickerWrapper>
				<S.TimePickerWrapper>
					<S.SelectedWrapper>
						<Select
							size='sm'
							options={toTimeOptions}
							select={timeRange.to}
							setSelect={(idx) => handleTimeRange('to', toTimeOptions[idx - 1])}
						/>
					</S.SelectedWrapper>
					<Text size='md' weight='regular'>
						까지
					</Text>
				</S.TimePickerWrapper>
			</S.TimePickerContainer>
		</Flex>
	);
};

export default TimeRangeSection;
