import type { DateString } from '@type/post';

export const formatDate = (date: Date): DateString => {
	const yyyy = date.getFullYear();
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const dd = String(date.getDate()).padStart(2, '0');

	return `${yyyy}-${mm}-${dd}` as DateString;
};
