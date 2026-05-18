import { useState } from 'react';
import SelectDateStep from '@components/Post/SchedulingPost/Step/SelectDateStep';
import SetTimeStep from '@components/Post/SchedulingPost/Step/SetTimeStep';
import useHistoryFunnel from '@hooks/common/funnel/useHistoryFunnel';
import useSchedulingFeedMutation from '@hooks/queries/post/useSchedulingFeedMutation';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { INITIAL_SCHEDULING_FORM } from '@constants/post';
import type { SchedulingFeedForm } from '@type/feed';
import * as S from './SchedulingPost.styled';

const STEPS = ['selectDate', 'setTime'] as const;

const SchedulingPost = () => {
	const { Funnel, step, goNext, goPrev } = useHistoryFunnel(STEPS);

	const { userStatus } = useUserStatusQuery();
	const teamspaceId = userStatus?.profile.lastSeenTeamspaceId;

	const [formData, setFormData] = useState<SchedulingFeedForm>(INITIAL_SCHEDULING_FORM);

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
