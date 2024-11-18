import { useState } from 'react';
import { Day } from '@type/post';

const useDaySelection = (init: Day[] = []) => {
	const [selectedDays, setSelectedDays] = useState<Day[]>(init);

	const areDaysEqual = (day1: Day, day2: Day) => {
		return (
			day1.year === day2.year &&
			day1.month === day2.month &&
			day1.day === day2.day
		);
	};

	const isDaySelected = (days: Day[], day: Day) => {
		return days.some((selectedDay) => areDaysEqual(selectedDay, day));
	};

	const addDayToSelection = (days: Day[], day: Day) => {
		return [...days, day];
	};

	const removeDayFromSelection = (days: Day[], day: Day) => {
		return days.filter((selectedDay) => !areDaysEqual(selectedDay, day));
	};

	const updateDaySelection = (days: Day[], day: Day) => {
		return isDaySelected(days, day)
			? removeDayFromSelection(days, day)
			: addDayToSelection(days, day);
	};

	const toggleDaySelection = (day: Day) => {
		setSelectedDays((prev) => updateDaySelection(prev, day));
	};

	return {
		selectedDays,
		toggleDaySelection,
		isDaySelected,
	};
};

export default useDaySelection;
