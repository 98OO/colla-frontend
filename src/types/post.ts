export interface Day {
	year: number;
	month: number;
	day: number;
}

export type SchedulingPostStep = 'selectDate' | 'setTime';

export interface SelectDateProps {
	onNext: () => void;
}

export interface SetTimeProps {
	onPrev: () => void;
	onSubmit: () => void;
}
