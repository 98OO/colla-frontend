import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import DatePicker from '@components/Post/DatePicker/DatePicker';
import useCalendar from '@hooks/post/useCalendar';
import useDaySelection from '@hooks/post/useDaySelection';
import { Day, SchedulingCondition } from '@type/post';
import * as S from '../SchedulingPost.styled';

interface DueAtSectionProps {
	initialDueAt: string;
	updateCondition: (patch: Partial<SchedulingCondition>) => void;
}

const DueAtSection = ({ initialDueAt, updateCondition }: DueAtSectionProps) => {
	const { getInitialDueAt, getFormattedDay } = useCalendar();
	const initalDueAt = getInitialDueAt(initialDueAt);
	const { selectedDays, isDaySelected, toggleDaySelection } = useDaySelection(
		initalDueAt,
		'single'
	);

	const handleDaySelection = (day: Day) => {
		toggleDaySelection(day);
		updateCondition({ dueAt: getFormattedDay(day, true) });
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
					selectedDays={selectedDays}
					isDaySelected={isDaySelected}
					toggleDaySelection={handleDaySelection}
				/>
			</S.DatePickerWrapper>
		</Flex>
	);
};

export default DueAtSection;
