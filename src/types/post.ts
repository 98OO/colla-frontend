export interface Day {
	year: number;
	month: number;
	day: number;
}

export type SchedulingPostStep = 'selectDate' | 'setTime';

interface DaySelection {
	selectedDays: Day[];
	isDaySelected: (days: Day[], day: Day) => boolean;
	toggleDaySelection: (day: Day) => void;
}

export interface CalendarProps extends DaySelection {}

export interface SelectDateProps {
	onNext: () => void;
	targetDates: string[];
	handleTargetDates: (dates: string[]) => void;
}

export interface SetTimeProps {
	onPrev: () => void;
	onSubmit: () => void;
}
