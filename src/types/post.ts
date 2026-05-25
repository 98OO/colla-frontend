export type DateString = string & { readonly __brand: 'DateString' };

export interface SchedulingPostFormData {
	title: string;
	details: {
		dueAt: string;
		minTimeSegment: number;
		maxTimeSegment: number;
		targetDates: Set<DateString>;
	};
}

export interface Day {
	year: number;
	month: number;
	day: number;
	hour?: number;
	minute?: number;
}

interface DaySelection {
	selectedDays: Day[];
	isDaySelected: (days: Day[], day: Day) => boolean;
	toggleDaySelection: (day: Day) => void;
}

export interface CalendarProps extends DaySelection {}

export type SelectionMode = 'multi' | 'single';
