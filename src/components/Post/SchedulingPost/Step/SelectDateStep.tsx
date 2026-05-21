import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import type { DateString } from '@type/post';

export interface SelectDateProps {
	onNext: () => void;
	targetDates: Set<DateString>;
	handleTargetDates: (dates: Set<DateString>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectDateStep = ({ onNext, targetDates, handleTargetDates }: SelectDateProps) => {
	const handleNext = () => {
		onNext();
	};

	return (
		<Flex justify='flex-end'>
			<Button label='다음' variant='primary' size='md' onClick={handleNext} />
		</Flex>
	);
};

export default SelectDateStep;
