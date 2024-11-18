import { useState } from 'react';
import SelectDateStep from '@components/Post/SchedulingPost/Step/SelectDateStep';
import SetTimeStep from '@components/Post/SchedulingPost/Step/SetTimeStep';
import { INITIAL_SCHEDULING_FORM } from '@constants/post';
import type { SchedulingFeedForm } from '@type/feed';
import type { SchedulingPostStep } from '@type/post';
import * as S from './SchedulingPost.styled';

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
