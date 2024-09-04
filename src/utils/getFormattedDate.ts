type FormatDateType = 'fullDate' | 'chatDate' | 'chatTime';

export const getFormattedDate = (date: string, formatType: FormatDateType) => {
	const todayDate = new Date();
	const targetDate = new Date(date);

	switch (formatType) {
		case 'fullDate': {
			if (todayDate.getFullYear() !== targetDate.getFullYear())
				return `${targetDate.getFullYear()}. ${targetDate.getMonth() + 1}. ${targetDate.getDate()}`;

			if (todayDate.getMonth() + 1 !== targetDate.getMonth() + 1)
				return `${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일`;

			if (todayDate.getDate() !== targetDate.getDate())
				return todayDate.getDate() - 1 === targetDate.getDate()
					? '어제'
					: `${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일`;

			return `${targetDate.getHours() >= 12 ? '오후' : '오전'} ${targetDate.getHours() % 12 || 12}:${targetDate.getMinutes().toString().padStart(2, '0')}`;
		}

		case 'chatDate':
			return `${targetDate.getFullYear()}년 ${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일`;

		case 'chatTime':
			return `${targetDate.getHours() >= 12 ? '오후' : '오전'} ${targetDate.getHours() % 12 || 12}:${targetDate.getMinutes().toString().padStart(2, '0')}`;

		default:
			return '';
	}
};
