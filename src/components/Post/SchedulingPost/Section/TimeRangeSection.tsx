import { useState } from 'react';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import Select from '@components/common/Select/Select';
import Text from '@components/common/Text/Text';
import { PERIOD_OPTIONS, DEFAULT_TIME_OPTIONS } from '@constants/post';
import type { SchedulingCondition, TimePoint, TimeRange } from '@type/post';
import * as S from '../SchedulingPost.styled';

interface TimeRangeProps {
	initialTimeRange: TimeRange;
	updateCondition: (patch: Partial<SchedulingCondition>) => void;
}

const TimeRangeSection = ({ initialTimeRange, updateCondition }: TimeRangeProps) => {
	const [timeRange, setTimeRange] = useState<TimeRange>(initialTimeRange);

	const handleTimeRange = (bound: keyof TimeRange, patch: Partial<TimePoint>) => {
		setTimeRange((prev) => {
			const updated = {
				...prev,
				[bound]: { ...prev[bound], ...patch },
			};

			updateCondition({ timeRange: updated });
			return updated;
		});
	};

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
							options={PERIOD_OPTIONS}
							select={timeRange.from.period}
							setSelect={(idx) => handleTimeRange('from', { period: PERIOD_OPTIONS[idx - 1] })}
						/>
					</S.SelectedWrapper>
					<S.SelectedWrapper>
						<Select
							size='sm'
							options={DEFAULT_TIME_OPTIONS}
							select={timeRange.from.time}
							setSelect={(idx) => handleTimeRange('from', { time: DEFAULT_TIME_OPTIONS[idx - 1] })}
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
							options={PERIOD_OPTIONS}
							select={timeRange.to.period}
							setSelect={(idx) => handleTimeRange('to', { period: PERIOD_OPTIONS[idx - 1] })}
						/>
					</S.SelectedWrapper>
					<S.SelectedWrapper>
						<Select
							size='sm'
							options={DEFAULT_TIME_OPTIONS}
							select={timeRange.to.time}
							setSelect={(idx) => handleTimeRange('to', { time: DEFAULT_TIME_OPTIONS[idx - 1] })}
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
