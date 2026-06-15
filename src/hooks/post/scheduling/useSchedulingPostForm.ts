import { useState } from 'react';
import getDefaultDueAt from '@utils/post/scheduling/getDefaultDueAt';
import { DEFAULT_TIME_RANGE } from '@constants/post';
import type { SchedulingPostFormData, DateString, SchedulingCondition } from '@type/post';

const createInitialSchedulingPostForm = (): SchedulingPostFormData => {
	const { dueAtDate, dueAtTime } = getDefaultDueAt();

	return {
		title: '',
		dueAtDate,
		dueAtTime,
		timeRange: DEFAULT_TIME_RANGE,
		targetDates: new Set<DateString>(),
	};
};

const useSchedulingPostForm = () => {
	const [formData, setFormData] = useState<SchedulingPostFormData>(createInitialSchedulingPostForm);

	const handleTargetDates = (dates: Set<DateString>) => {
		setFormData((prev) => ({
			...prev,
			targetDates: dates,
		}));
	};

	const handleCondition = (condition: SchedulingCondition) => {
		setFormData((prev) => ({
			...prev,
			...condition,
		}));
	};

	return { formData, handleTargetDates, handleCondition };
};

export default useSchedulingPostForm;
