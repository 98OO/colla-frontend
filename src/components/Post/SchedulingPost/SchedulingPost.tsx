import { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Calendar from '@components/Post/Calendar/Calendar';
import * as S from './SchedulingPost.styled';

type SchedulingPostStep = 'selectDate' | 'setTime';

interface SelectDateProps {
	onNext: () => void;
}

interface SetTimeProps {
	onPrev: () => void;
	onSubmit: () => void;
}

const SelectDate = ({ onNext }: SelectDateProps) => {
	return (
		<>
			<Calendar />
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
	const [step, setStep] = useState<SchedulingPostStep>('selectDate');

	return (
		<S.SchedulingPostContainer>
			{step === 'selectDate' && (
				<SelectDate onNext={() => setStep('setTime')} />
			)}
			{step === 'setTime' && (
				<SetTime onPrev={() => setStep('selectDate')} onSubmit={() => {}} />
			)}
		</S.SchedulingPostContainer>
	);
};

export default SchedulingPost;
