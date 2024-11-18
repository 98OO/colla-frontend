import { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import Calendar from '@components/Post/Calendar/Calendar';
import DatePicker from '@components/Post/DatePicker/DatePicker';
import useCalendar from '@hooks/post/useCalendar';
import useDaySelection from '@hooks/post/useDaySelection';
import { INITIAL_SCHEDULING_FORM } from '@constants/post';
import type { SchedulingFeedForm } from '@type/feed';
import type {
	SchedulingPostStep,
	SelectDateProps,
	SetTimeProps,
} from '@type/post';
import * as S from './SchedulingPost.styled';

const SelectDateStep = ({
	onNext,
	targetDates,
	handleTargetDates,
}: SelectDateProps) => {
	const { getInitialDays, getFormattedDay } = useCalendar();
	const initalDays = getInitialDays(targetDates);
	const { selectedDays, isDaySelected, toggleDaySelection } =
		useDaySelection(initalDays);

	const handleNext = () => {
		const formattedDates = selectedDays.map((day) => getFormattedDay(day));

		handleTargetDates(formattedDates);
		onNext();
	};

	return (
		<>
			<Calendar
				selectedDays={selectedDays}
				isDaySelected={isDaySelected}
				toggleDaySelection={toggleDaySelection}
			/>
			<Flex justify='flex-end'>
				<Button label='다음' variant='primary' size='md' onClick={handleNext} />
			</Flex>
		</>
	);
};

const SetTimeStep = ({
	onPrev,
	onSubmit,
	dueAt,
	handleDueAt,
}: SetTimeProps) => {
	const { getInitialDueAt } = useCalendar();
	const initalDueAt = getInitialDueAt(dueAt);
	const { selectedDays, isDaySelected, toggleDaySelection } = useDaySelection(
		initalDueAt,
		'single'
	);

	const [title, setTitle] = useState('');

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleSumbit = () => {
		handleDueAt('');
		onSubmit();
	};

	return (
		<>
			<Flex direction='column' gap='48'>
				<S.PostInput
					placeholder='제목을 입력해주세요'
					value={title}
					onChange={handleTitleChange}
				/>
				<Flex direction='column' gap='12'>
					<Flex align='center' gap='6'>
						<Icon name='Clock' />
						<Heading size='xs' color='secondary'>
							마감 일시
						</Heading>
					</Flex>
					<DatePicker
						selectedDays={selectedDays}
						isDaySelected={isDaySelected}
						toggleDaySelection={toggleDaySelection}
					/>
				</Flex>
				<Flex direction='column' gap='12'>
					<Flex align='center' gap='6'>
						<Icon name='Calendar' />
						<Heading size='xs' color='secondary'>
							시간 범위
						</Heading>
					</Flex>
				</Flex>
			</Flex>
			<Flex justify='flex-end' gap='12'>
				<Button label='이전' variant='secondary' size='md' onClick={onPrev} />
				<Button
					label='등록'
					variant='primary'
					size='md'
					onClick={() => handleSumbit()}
				/>
			</Flex>
		</>
	);
};

const SchedulingPost = () => {
	const [step, setStep] = useState<SchedulingPostStep>('selectDate');
	const [formData, setFormData] = useState<SchedulingFeedForm>(
		INITIAL_SCHEDULING_FORM
	);

	const handleTargetDates = (dates: string[]) => {
		setFormData((prev) => ({
			...prev,
			details: {
				...prev.details,
				targetDates: dates,
			},
		}));
	};

	const handleDueAt = (dueAt: string) => {
		setFormData((prev) => ({
			...prev,
			details: {
				...prev.details,
				dueAt,
			},
		}));
	};

	return (
		<S.SchedulingPostContainer>
			{step === 'selectDate' && (
				<SelectDateStep
					onNext={() => setStep('setTime')}
					targetDates={formData.details.targetDates}
					handleTargetDates={handleTargetDates}
				/>
			)}
			{step === 'setTime' && (
				<SetTimeStep
					onPrev={() => setStep('selectDate')}
					dueAt={formData.details.dueAt}
					handleDueAt={handleDueAt}
					onSubmit={() => {}}
				/>
			)}
		</S.SchedulingPostContainer>
	);
};

export default SchedulingPost;
