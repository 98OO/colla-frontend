import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Calendar from '@components/Post/Calendar/Calendar';
import useCalendar from '@hooks/post/useCalendar';
import useDaySelection from '@hooks/post/useDaySelection';
import type { SelectDateProps } from '@type/post';

const SelectDateStep = ({
	onNext,
	targetDates,
	handleTargetDates,
}: SelectDateProps) => {
	const { getInitialDays, getFormattedDay } = useCalendar();
	const initalDays = getInitialDays(targetDates);
	const { selectedDays, isDaySelected, toggleDaySelection } =
		useDaySelection(initalDays);

	const handleNext = () => {
		const formattedDates = selectedDays.map((day) => getFormattedDay(day));

		handleTargetDates(formattedDates);
		onNext();
	};

	return (
		<>
			<Calendar
				selectedDays={selectedDays}
				isDaySelected={isDaySelected}
				toggleDaySelection={toggleDaySelection}
			/>
			<Flex justify='flex-end'>
				<Button label='다음' variant='primary' size='md' onClick={handleNext} />
			</Flex>
		</>
	);
};

export default SelectDateStep;
