import SelectDateStep from '@components/Post/SchedulingPost/Step/SelectDateStep';
import SetTimeStep from '@components/Post/SchedulingPost/Step/SetTimeStep';
import useHistoryFunnel from '@hooks/common/funnel/useHistoryFunnel';
import useSchedulingPostForm from '@hooks/post/scheduling/useSchedulingPostForm';
import useSchedulingPostMutation from '@hooks/queries/post/useSchedulingPostMutation';
import * as S from './SchedulingPost.styled';

const STEPS = ['selectDate', 'setTime'] as const;

const SchedulingPost = () => {
	const { Funnel, step, goNext, goPrev } = useHistoryFunnel(STEPS);
	const { formData, handleTargetDates, handleDetail } = useSchedulingPostForm();
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
