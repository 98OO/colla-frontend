import { useRef, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import DueAtSection from '@components/Post/SchedulingPost/Section/DueAtSection';
import TimeRangeSection from '@components/Post/SchedulingPost/Section/TimeRangeSection';
import TitleSection from '@components/Post/SchedulingPost/Section/TitleSection';
import isPastTime from '@utils/post/scheduling/isPastTime';
import useToastStore from '@stores/toastStore';
import { DUE_AT_PAST_MESSAGE } from '@constants/post';
import type { DateString, SchedulingCondition, TimeString, TimeRange } from '@type/post';

interface SetConditionProps {
	initialTitle: string;
	initialDueAtDate: DateString;
	initialDueAtTime: TimeString;
	initialTimeRange: TimeRange;
	isSubmitting?: boolean;
	onPrev: () => void;
	onSave: (condition: SchedulingCondition) => void;
	onSubmit: (condition: SchedulingCondition) => void;
}

const SetConditionStep = ({
	initialTitle,
	initialDueAtDate,
	initialDueAtTime,
	initialTimeRange,
	isSubmitting = false,
	onPrev,
	onSave,
	onSubmit,
}: SetConditionProps) => {
	const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
	const { makeToast } = useToastStore();

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

		const { dueAtDate, dueAtTime } = conditionRef.current;

		if (isPastTime(dueAtDate, dueAtTime)) {
			makeToast(DUE_AT_PAST_MESSAGE, 'Warning');
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
				<Button
					label='등록'
					variant='primary'
					size='md'
					onClick={handleSubmit}
					disabled={isSubmitting}
				/>
			</Flex>
		</>
	);
};

export default SetConditionStep;
