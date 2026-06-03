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

	isSameMonth(targetDate: Date, baseDate: Date): boolean {
		return (
			targetDate.getFullYear() === baseDate.getFullYear() &&
			targetDate.getMonth() === baseDate.getMonth()
		);
	},

	isPast(targetDate: Date): boolean {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const target = new Date(targetDate);
		target.setHours(0, 0, 0, 0);

		return target.getTime() < today.getTime();
	},

	isSameDate(targetDate: Date, baseDate: Date): boolean {
		return (
			targetDate.getFullYear() === baseDate.getFullYear() &&
			targetDate.getMonth() === baseDate.getMonth() &&
			targetDate.getDate() === baseDate.getDate()
		);
	},

	isToday(targetDate: Date): boolean {
		return DateManager.isSameDate(targetDate, new Date());
	},

	isAfter(targetDate: Date, limitDate: Date): boolean {
		const target = new Date(targetDate);
		target.setHours(0, 0, 0, 0);

		const limit = new Date(limitDate);
		limit.setHours(0, 0, 0, 0);

		return target.getTime() > limit.getTime();
	},
};
