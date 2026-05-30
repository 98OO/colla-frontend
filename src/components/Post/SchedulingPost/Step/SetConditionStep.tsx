import { useEffect, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import Select from '@components/common/Select/Select';
import Text from '@components/common/Text/Text';
import DatePicker from '@components/Post/DatePicker/DatePicker';
import useCalendar from '@hooks/post/useCalendar';
import useDaySelection from '@hooks/post/useDaySelection';
import { PERIOD_OPTIONS, DEFAULT_TIME_OPTIONS } from '@constants/post';
import type { TimePoint, TimeRange } from '@type/post';
import * as S from '../SchedulingPost.styled';

interface SetConditionProps {
	initialTitle: string;
	initialDueAt: string;
	initialTimeRange: TimeRange;
	onPrev: () => void;
	onSubmit: () => void;
	handleCondition: ({
		title,
		dueAt,
		timeRange,
	}: {
		title: string;
		dueAt: string;
		timeRange: TimeRange;
	}) => void;
}

const SetConditionStep = ({
	initialTitle,
	initialDueAt,
	initialTimeRange,
	onPrev,
	onSubmit,
	handleCondition,
}: SetConditionProps) => {
	const { getInitialDueAt, getFormattedDay } = useCalendar();
	const initalDueAt = getInitialDueAt(initialDueAt);
	const { selectedDays, isDaySelected, toggleDaySelection } = useDaySelection(
		initalDueAt,
		'single'
	);

	const [title, setTitle] = useState(initialTitle);
	const [titleError, setTitleError] = useState(false);
	const [timeRange, setTimeRange] = useState<TimeRange>(initialTimeRange);

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
		if (event.target.value) {
			setTitleError(false);
		}
	};

	const handleTimeRange = (bound: keyof TimeRange, patch: Partial<TimePoint>) => {
		setTimeRange((prev) => ({
			...prev,
			[bound]: { ...prev[bound], ...patch },
		}));
	};

	useEffect(() => {
		const convertedDueAt = getFormattedDay(selectedDays[0], true);

		handleCondition({ title, dueAt: convertedDueAt, timeRange });
	}, [title, selectedDays, timeRange]);

	const handleSubmit = () => {
		if (!title.trim()) {
			setTitleError(true);
			return;
		}
		onSubmit();
	};

	return (
		<>
			<Flex direction='column' gap='60'>
				<Flex direction='column'>
					<S.PostInput
						placeholder='제목을 입력해주세요'
						value={title}
						onChange={handleTitleChange}
					/>
					{titleError && (
						<Flex direction='column' marginTop='8' width='300'>
							<Text size='md' weight='regular' color='danger'>
								제목이 없어요
							</Text>
						</Flex>
					)}
				</Flex>
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
							toggleDaySelection={toggleDaySelection}
						/>
					</S.DatePickerWrapper>
				</Flex>
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
									setSelect={(idx) =>
										handleTimeRange('from', { time: DEFAULT_TIME_OPTIONS[idx - 1] })
									}
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
									setSelect={(idx) =>
										handleTimeRange('to', { time: DEFAULT_TIME_OPTIONS[idx - 1] })
									}
								/>
							</S.SelectedWrapper>
							<Text size='md' weight='regular'>
								까지
							</Text>
						</S.TimePickerWrapper>
					</S.TimePickerContainer>
				</Flex>
			</Flex>
			<Flex justify='flex-end' gap='12'>
				<Button label='이전' variant='secondary' size='md' onClick={onPrev} />
				<Button label='등록' variant='primary' size='md' onClick={handleSubmit} />
			</Flex>
		</>
	);
};

export default SetConditionStep;
