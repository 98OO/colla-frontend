import { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import Calendar from '@components/Post/Calendar/Calendar';
import useCalendar from '@hooks/post/useCalendar';
import useDaySelection from '@hooks/post/useDaySelection';
import { SchedulingPostStep, SelectDateProps, SetTimeProps } from '@type/post';
import * as S from './SchedulingPost.styled';

const SelectDateStep = ({
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

const SetTimeStep = ({ onPrev, onSubmit }: SetTimeProps) => {
	const [title, setTitle] = useState('');

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	return (
		<>
			<Flex direction='column' gap='48'>
				<S.PostInput
					placeholder='제목을 입력해주세요'
					value={title}
					onChange={handleTitleChange}
				/>
				<Flex direction='column' gap='12'>
					<Flex align='center' gap='6'>
						<Icon name='Clock' />
						<Heading size='xs' color='secondary'>
							마감 일시
						</Heading>
					</Flex>
					{/* date Picker */}
				</Flex>
				<Flex direction='column' gap='12'>
					<Flex align='center' gap='6'>
						<Icon name='Calendar' />
						<Heading size='xs' color='secondary'>
							시간 범위
						</Heading>
					</Flex>
				</Flex>
			</Flex>
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
				<SelectDateStep
					onNext={() => setStep('setTime')}
					selectedDays={selectedDays}
					isDaySelected={isDaySelected}
					toggleDaySelection={toggleDaySelection}
				/>
			)}
			{step === 'setTime' && (
				<SetTimeStep onPrev={() => setStep('selectDate')} onSubmit={() => {}} />
			)}
		</S.SchedulingPostContainer>
	);
};

export default SchedulingPost;
