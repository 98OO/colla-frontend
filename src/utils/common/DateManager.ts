export const DateManager = {
	getDateCountInMonth(year: number, month: number) {
		if (year < 0) throw new Error('연도는 0 이상이어야 합니다');
		if (month < 0 || month > 11) throw new Error('달은 0부터 11 사이의 값이어야 합니다');

		return new Date(year, month + 1, 0).getDate();
	},

	getFirstDayInMonth(year: number, month: number) {
		if (year < 0) throw new Error('연도는 0 이상이어야 합니다');
		if (month < 0 || month > 11) throw new Error('달은 0부터 11 사이의 값이어야 합니다');

		return new Date(year, month, 1).getDay();
	},

	getDateAfter(
		date: Date,
		{ years = 0, months = 0, days = 0 }: { years?: number; months?: number; days?: number }
	): Date {
		return new Date(date.getFullYear() + years, date.getMonth() + months, date.getDate() + days);
	},

	isSameMonth(targetDate: Date, baseDate: Date): boolean {
		return (
			targetDate.getFullYear() === baseDate.getFullYear() &&
			targetDate.getMonth() === baseDate.getMonth()
		);
	},

	isPastDate(targetDate: Date, today = new Date()): boolean {
		const base = new Date(today);
		base.setHours(0, 0, 0, 0);

		const target = new Date(targetDate);
		target.setHours(0, 0, 0, 0);

		return target.getTime() < base.getTime();
	},

	isSameDate(targetDate: Date, baseDate: Date): boolean {
		return (
			targetDate.getFullYear() === baseDate.getFullYear() &&
			targetDate.getMonth() === baseDate.getMonth() &&
			targetDate.getDate() === baseDate.getDate()
		);
	},

	isToday(targetDate: Date, today = new Date()): boolean {
		return DateManager.isSameDate(targetDate, today);
	},

	isAfterDate(targetDate: Date, baseDate: Date): boolean {
		const target = new Date(targetDate);
		target.setHours(0, 0, 0, 0);

		const base = new Date(baseDate);
		base.setHours(0, 0, 0, 0);

		return target.getTime() > base.getTime();
	},
};
