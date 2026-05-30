import SelectDateStep from '@components/Post/SchedulingPost/Step/SelectDateStep';
import SetConditionStep from '@components/Post/SchedulingPost/Step/SetConditionStep';
import useHistoryFunnel from '@hooks/common/funnel/useHistoryFunnel';
import useSchedulingPostForm from '@hooks/post/scheduling/useSchedulingPostForm';
import useSchedulingPostMutation from '@hooks/queries/post/useSchedulingPostMutation';
import * as S from './SchedulingPost.styled';

const STEPS = ['selectDate', 'setCondition'] as const;

const SchedulingPost = () => {
	const { Funnel, step, goNext, goPrev } = useHistoryFunnel(STEPS);
	const { formData, handleTargetDates, handleCondition } = useSchedulingPostForm();
	const { mutateSchedulingPost } = useSchedulingPostMutation();

	const handleSubmit = () => {
		mutateSchedulingPost(formData);
	};

	return (
		<S.SchedulingPostContainer>
			<Funnel step={step}>
				<Funnel.Step name='selectDate'>
					<SelectDateStep
						onNext={goNext}
						targetDates={formData.targetDates}
						handleTargetDates={handleTargetDates}
					/>
				</Funnel.Step>
				<Funnel.Step name='setCondition'>
					<SetConditionStep
						initialTitle={formData.title}
						initialDueAt={formData.dueAt}
						initialTimeRange={formData.timeRange}
						onPrev={goPrev}
						onSubmit={handleSubmit}
						handleCondition={handleCondition}
					/>
				</Funnel.Step>
			</Funnel>
		</S.SchedulingPostContainer>
	);
};

export default SchedulingPost;
