import { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import DatePicker from '@components/Post/DatePicker/DatePicker';
import useCalendar from '@hooks/post/useCalendar';
import useDaySelection from '@hooks/post/useDaySelection';
import type { SetTimeProps } from '@type/post';
import * as S from '../SchedulingPost.styled';

const SetTimeStep = ({
	onPrev,
	onSubmit,
	dueAt,
	handleDueAt,
}: SetTimeProps) => {
	const { getInitialDueAt, getFormattedDay } = useCalendar();
	const initalDueAt = getInitialDueAt(dueAt);
	const { selectedDays, isDaySelected, toggleDaySelection } = useDaySelection(
		initalDueAt,
		'single'
	);

	const [title, setTitle] = useState('');

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleSumbit = () => {
		handleDueAt(getFormattedDay(selectedDays[0], true));
		onSubmit();
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
					<S.DatePickerWrapper>
						<DatePicker
							selectedDays={selectedDays}
							isDaySelected={isDaySelected}
							toggleDaySelection={toggleDaySelection}
						/>
					</S.DatePickerWrapper>
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
				<Button
					label='등록'
					variant='primary'
					size='md'
					onClick={() => handleSumbit()}
				/>
			</Flex>
		</>
	);
};

export default SetTimeStep;
