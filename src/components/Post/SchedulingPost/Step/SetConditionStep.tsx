import { useRef, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import DueAtSection from '@components/Post/SchedulingPost/Section/DueAtSection';
import TimeRangeSection from '@components/Post/SchedulingPost/Section/TimeRangeSection';
import TitleSection from '@components/Post/SchedulingPost/Section/TitleSection';
import type { SchedulingCondition, TimeRange } from '@type/post';

interface SetConditionProps {
	initialTitle: string;
	initialDueAt: string;
	initialTimeRange: TimeRange;
	onPrev: () => void;
	onSave: (condition: SchedulingCondition) => void;
	onSubmit: (condition: SchedulingCondition) => void;
}

const SetConditionStep = ({
	initialTitle,
	initialDueAt,
	initialTimeRange,
	onPrev,
	onSave,
	onSubmit,
}: SetConditionProps) => {
	const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

	const conditionRef = useRef<SchedulingCondition>({
		title: initialTitle,
		dueAt: initialDueAt,
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
				<DueAtSection initialDueAt={initialDueAt} updateCondition={updateCondition} />
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
