import { useState } from 'react';
import SelectDateStep from '@components/Post/SchedulingPost/Step/SelectDateStep';
import SetTimeStep from '@components/Post/SchedulingPost/Step/SetTimeStep';
import useHistoryFunnel from '@hooks/common/funnel/useHistoryFunnel';
import useSchedulingPostMutation from '@hooks/queries/post/useSchedulingPostMutation';
import { INITIAL_SCHEDULING_FORM } from '@constants/post';
import type { SchedulingFeedForm } from '@type/feed';
import * as S from './SchedulingPost.styled';

const STEPS = ['selectDate', 'setTime'] as const;

const SchedulingPost = () => {
	const { Funnel, step, goNext, goPrev } = useHistoryFunnel(STEPS);

	const [formData, setFormData] = useState<SchedulingFeedForm>(INITIAL_SCHEDULING_FORM);

	const { mutateSchedulingPost } = useSchedulingPostMutation();

	const handleTargetDates = (dates: string[]) => {
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

	const handleSubmit = () => {
		mutateSchedulingPost(formData);
	};

	return (
		<S.SchedulingPostContainer>
			<Funnel step={step}>
				<Funnel.Step name='selectDate'>
					<SelectDateStep
						onNext={goNext}
						targetDates={formData.details.targetDates}
						handleTargetDates={handleTargetDates}
					/>
				</Funnel.Step>
				<Funnel.Step name='setTime'>
					<SetTimeStep
						onPrev={goPrev}
						dueAt={formData.details.dueAt}
						handleDetail={handleDetail}
						onSubmit={handleSubmit}
					/>
				</Funnel.Step>
			</Funnel>
		</S.SchedulingPostContainer>
	);
};

export default SchedulingPost;
