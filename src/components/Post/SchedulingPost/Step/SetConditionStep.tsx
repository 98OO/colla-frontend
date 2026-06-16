import { useRef, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import DueAtSection from '@components/Post/SchedulingPost/Section/DueAtSection';
import TimeRangeSection from '@components/Post/SchedulingPost/Section/TimeRangeSection';
import TitleSection from '@components/Post/SchedulingPost/Section/TitleSection';
import type { DateString, SchedulingCondition, TimeString, TimeRange } from '@type/post';

interface SetConditionProps {
	initialTitle: string;
	initialDueAtDate: DateString;
	initialDueAtTime: TimeString;
	initialTimeRange: TimeRange;
	onPrev: () => void;
	onSave: (condition: SchedulingCondition) => void;
	onSubmit: (condition: SchedulingCondition) => void;
}

const SetConditionStep = ({
	initialTitle,
	initialDueAtDate,
	initialDueAtTime,
	initialTimeRange,
	onPrev,
	onSave,
	onSubmit,
}: SetConditionProps) => {
	const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

	const conditionRef = useRef<SchedulingCondition>({
		title: initialTitle,
		dueAtDate: initialDueAtDate,
		dueAtTime: initialDueAtTime,
		timeRange: initialTimeRange,
	});

	const updateCondition = (patch: Partial<SchedulingCondition>) => {
		conditionRef.current = {
			...conditionRef.current,
			...patch,
		};
	};

	const handlePrev = () => {
		onSave(conditionRef.current);
		onPrev();
	};

	const handleSubmit = () => {
		if (!conditionRef.current.title.trim()) {
			setIsSubmitAttempted(true);
			return;
		}

		onSave(conditionRef.current);
		onSubmit(conditionRef.current);
	};

	return (
		<>
			<Flex direction='column' gap='60'>
				<TitleSection
					isSubmitAttempted={isSubmitAttempted}
					initialTitle={initialTitle}
					updateCondition={updateCondition}
				/>
				<DueAtSection
					initialDueAtDate={initialDueAtDate}
					initialDueAtTime={initialDueAtTime}
					updateCondition={updateCondition}
				/>
				<TimeRangeSection initialTimeRange={initialTimeRange} updateCondition={updateCondition} />
			</Flex>
			<Flex justify='flex-end' gap='12'>
				<Button label='이전' variant='secondary' size='md' onClick={handlePrev} />
				<Button label='등록' variant='primary' size='md' onClick={handleSubmit} />
			</Flex>
		</>
	);
};

export default SetConditionStep;
