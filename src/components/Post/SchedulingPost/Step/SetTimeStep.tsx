import { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import Select from '@components/common/Select/Select';
import Text from '@components/common/Text/Text';
import DatePicker from '@components/Post/DatePicker/DatePicker';
import useCalendar from '@hooks/post/useCalendar';
import useDaySelection from '@hooks/post/useDaySelection';
import { AMPM_OPTIONS, TIME_OPTIONS } from '@constants/post';
import type { SetTimeProps } from '@type/post';
import * as S from '../SchedulingPost.styled';

const SetTimeStep = ({
	onPrev,
	onSubmit,
	dueAt,
	handleDetail,
}: SetTimeProps) => {
	const { getInitialDueAt, getFormattedDay } = useCalendar();
	const initalDueAt = getInitialDueAt(dueAt);
	const { selectedDays, isDaySelected, toggleDaySelection } = useDaySelection(
		initalDueAt,
		'single'
	);

	const [title, setTitle] = useState('');

	const [amPmFrom, setAmPmFrom] = useState<string>('오전');
	const [fromTime, setFromTime] = useState<string>('9:00');

	const [amPmTo, setAmPmTo] = useState<string>('오후');
	const [toTime, setToTime] = useState<string>('6:00');

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleAmPmSelect = (index: number, from: boolean = true) => {
		const select = AMPM_OPTIONS[index - 1];
		if (from) setAmPmFrom(select);
		else setAmPmTo(select);
	};

	const handleTimeSelect = (index: number, from: boolean = true) => {
		const select = TIME_OPTIONS[index - 1];
		if (from) setFromTime(select);
		else setToTime(select);
	};

	const calcTimeSegment = (ampm: string, time: string) => {
		const [hour, minute] = time.split(':').map(Number);
		let adjustedHour = hour;

		if (ampm === '오후' && hour !== 12) {
			adjustedHour += 12;
		}
		if (ampm === '오전' && hour === 12) {
			adjustedHour = 0;
		}
		return adjustedHour * 2 + (minute === 30 ? 1 : 0);
	};

	const handleSumbit = () => {
		const minTimeSegment = calcTimeSegment(amPmFrom, fromTime);
		const maxTimeSegment = calcTimeSegment(amPmTo, toTime);

		handleDetail(
			title,
			minTimeSegment,
			maxTimeSegment,
			getFormattedDay(selectedDays[0], true)
		);
		onSubmit();
	};

	return (
		<>
			<Flex direction='column' gap='60'>
				<S.PostInput
					placeholder='제목을 입력해주세요'
					value={title}
					onChange={handleTitleChange}
				/>
				<Flex direction='column' gap='20'>
					<Flex align='center' gap='6'>
						<Icon name='Clock' />
						<Heading size='xs' color='secondary'>
							마감 일시
						</Heading>
					</Flex>
					<Text size='md' weight='regular' color='tertiary'>
						일정 조율이 마감될 일시를 선택해주세요
					</Text>
					<S.DatePickerWrapper>
						<DatePicker
							selectedDays={selectedDays}
							isDaySelected={isDaySelected}
							toggleDaySelection={toggleDaySelection}
						/>
					</S.DatePickerWrapper>
				</Flex>
				<Flex direction='column' gap='20'>
					<Flex align='center' gap='6'>
						<Icon name='Calendar' />
						<Heading size='xs' color='secondary'>
							시간 범위
						</Heading>
					</Flex>
					<Text size='md' weight='regular' color='tertiary'>
						일정이 이뤄진 시간 범위를 선택해주세요
					</Text>
					<S.TimePickerContainer>
						<S.TimePickerWrapper>
							<S.SelectedWrapper>
								<Select
									size='sm'
									options={AMPM_OPTIONS}
									select={amPmFrom}
									setSelect={handleAmPmSelect}
								/>
							</S.SelectedWrapper>
							<S.SelectedWrapper>
								<Select
									size='sm'
									options={TIME_OPTIONS}
									select={fromTime}
									setSelect={handleTimeSelect}
								/>
							</S.SelectedWrapper>
							<Text size='md' weight='regular'>
								부터
							</Text>
						</S.TimePickerWrapper>
						<S.TimePickerWrapper>
							<S.SelectedWrapper>
								<Select
									size='sm'
									options={AMPM_OPTIONS}
									select={amPmTo}
									setSelect={(idx) => handleAmPmSelect(idx, false)}
								/>
							</S.SelectedWrapper>
							<S.SelectedWrapper>
								<Select
									size='sm'
									options={TIME_OPTIONS}
									select={toTime}
									setSelect={(idx) => handleTimeSelect(idx, false)}
								/>
							</S.SelectedWrapper>
							<Text size='md' weight='regular'>
								까지
							</Text>
						</S.TimePickerWrapper>
					</S.TimePickerContainer>
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
