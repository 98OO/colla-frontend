import { useState } from 'react';
import { formatDate } from '@utils/calendar/formatDate';
import { DEFAULT_DUE_TIME, DEFAULT_TIME_RANGE } from '@constants/post';
import type { SchedulingPostFormData, DateString, SchedulingCondition } from '@type/post';

const createInitialSchedulingPostForm = (): SchedulingPostFormData => ({
	title: '',
	dueAtDate: formatDate(new Date()),
	dueAtTime: DEFAULT_DUE_TIME,
	timeRange: DEFAULT_TIME_RANGE,
	targetDates: new Set<DateString>(),
});

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
