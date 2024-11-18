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

export interface SelectDateProps extends DaySelection {
	onNext: () => void;
}

export interface SetTimeProps {
	onPrev: () => void;
	onSubmit: () => void;
}
