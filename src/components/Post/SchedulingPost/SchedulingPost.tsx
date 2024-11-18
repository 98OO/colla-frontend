import { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Calendar from '@components/Post/Calendar/Calendar';
import useCalendar from '@hooks/post/useCalendar';
import useDaySelection from '@hooks/post/useDaySelection';
import { SchedulingPostStep, SelectDateProps, SetTimeProps } from '@type/post';
import * as S from './SchedulingPost.styled';

const SelectDate = ({
	onNext,
	selectedDays,
	isDaySelected,
	toggleDaySelection,
}: SelectDateProps) => {
	return (
		<>
			<Calendar
				selectedDays={selectedDays}
				isDaySelected={isDaySelected}
				toggleDaySelection={toggleDaySelection}
			/>
			<Flex justify='flex-end'>
				<Button label='다음' variant='primary' size='md' onClick={onNext} />
			</Flex>
		</>
	);
};

const SetTime = ({ onPrev, onSubmit }: SetTimeProps) => {
	return (
		<>
			<div>시간 설정 단계</div>
			<Flex justify='flex-end' gap='12'>
				<Button label='이전' variant='secondary' size='md' onClick={onPrev} />
				<Button label='등록' variant='primary' size='md' onClick={onSubmit} />
			</Flex>
		</>
	);
};

const SchedulingPost = () => {
	const { getToday } = useCalendar();
	const { selectedDays, isDaySelected, toggleDaySelection } = useDaySelection([
		getToday(),
	]);

	const [step, setStep] = useState<SchedulingPostStep>('selectDate');

	return (
		<S.SchedulingPostContainer>
			{step === 'selectDate' && (
				<SelectDate
					onNext={() => setStep('setTime')}
					selectedDays={selectedDays}
					isDaySelected={isDaySelected}
					toggleDaySelection={toggleDaySelection}
				/>
			)}
			{step === 'setTime' && (
				<SetTime onPrev={() => setStep('selectDate')} onSubmit={() => {}} />
			)}
		</S.SchedulingPostContainer>
	);
};

export default SchedulingPost;
