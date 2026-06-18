import { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Calendar from '@components/Post/SchedulingPost/Calendar/Calendar';
import type { DateString } from '@type/post';

interface SelectDateProps {
	onNext: () => void;
	targetDates: Set<DateString>;
	handleTargetDates: (targetDates: Set<DateString>) => void;
}

const SelectDateStep = ({ onNext, targetDates, handleTargetDates }: SelectDateProps) => {
	const [selectedDates, setSelectedDates] = useState<Set<DateString>>(() => new Set(targetDates));

	const handleNext = () => {
		handleTargetDates(selectedDates);
		onNext();
	};

	return (
		<>
			<Calendar selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
			<Flex justify='flex-end'>
				<Button
					label='다음'
					variant='primary'
					size='md'
					disabled={selectedDates.size === 0}
					onClick={handleNext}
				/>
			</Flex>
		</>
	);
};

export default SelectDateStep;
