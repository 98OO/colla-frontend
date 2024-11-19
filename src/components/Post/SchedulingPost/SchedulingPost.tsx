import { useState } from 'react';
import SelectDateStep from '@components/Post/SchedulingPost/Step/SelectDateStep';
import SetTimeStep from '@components/Post/SchedulingPost/Step/SetTimeStep';
import useSchedulingFeedMutation from '@hooks/queries/post/useSchedulingFeedMutation';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { INITIAL_SCHEDULING_FORM } from '@constants/post';
import type { SchedulingFeedForm } from '@type/feed';
import type { SchedulingPostStep } from '@type/post';
import * as S from './SchedulingPost.styled';

const SchedulingPost = () => {
	const { userStatus } = useUserStatusQuery();
	const teamspaceId = userStatus?.profile.lastSeenTeamspaceId;

	const [step, setStep] = useState<SchedulingPostStep>('selectDate');
	const [formData, setFormData] = useState<SchedulingFeedForm>(
		INITIAL_SCHEDULING_FORM
	);

	const { mutateSchedulingFeed } = useSchedulingFeedMutation();

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
		if (!teamspaceId) return;

		mutateSchedulingFeed(formData, teamspaceId);
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
					handleDetail={handleDetail}
					onSubmit={handleSubmit}
				/>
			)}
		</S.SchedulingPostContainer>
	);
};

export default SchedulingPost;
