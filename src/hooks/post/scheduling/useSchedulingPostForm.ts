import { useState } from 'react';
import type { SchedulingPostFormData, DateString } from '@type/post';

const createInitialSchedulingPostForm = (): SchedulingPostFormData => ({
	title: '',
	details: {
		dueAt: '',
		minTimeSegment: 0,
		maxTimeSegment: 1,
		targetDates: new Set<DateString>(),
	},
});

const useSchedulingPostForm = () => {
	const [formData, setFormData] = useState<SchedulingPostFormData>(createInitialSchedulingPostForm);

	const handleTargetDates = (dates: Set<DateString>) => {
		setFormData((prev) => ({
			...prev,
			details: {
				...prev.details,
				targetDates: dates,
			},
		}));
	};

	const handleDetail = (
		title: string,
		minTimeSegment: number,
		maxTimeSegment: number,
		dueAt: string
	) => {
		setFormData((prev) => ({
			title,
			details: {
				...prev.details,
				dueAt,
				minTimeSegment,
				maxTimeSegment,
			},
		}));
	};

	return { formData, handleTargetDates, handleDetail };
};

export default useSchedulingPostForm;
