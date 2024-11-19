type FormatDateType =
	| 'fullDate'
	| 'chatDate'
	| 'chatTime'
	| 'feed'
	| 'detail'
	| 'fullDateWithToday'
	| 'documentDate'
	| 'collectDate';

export const getFormattedDate = (
	dateString: string | Date,
	formatType: FormatDateType
): string => {
	const targetDate = new Date(dateString);
	const todayDate = new Date();

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

		case 'feed': {
			const diffMs = todayDate.getTime() - targetDate.getTime();
			const diffMinutes = Math.floor(diffMs / (1000 * 60));
			const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
			const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

			const getTimeString = (targetDateTime: Date) => {
				const hours = targetDateTime.getHours();
				const minutes = targetDateTime.getMinutes();
				const formattedHours = String(hours).padStart(2, '0');
				const formattedMinutes = String(minutes).padStart(2, '0');
				return ` ${formattedHours}:${formattedMinutes}`;
			};

			// 1분 미만
			if (diffMinutes < 1) {
				return '방금 전';
			}

			// 1시간 미만
			if (diffHours < 1) {
				return `${diffMinutes}분 전`;
			}

			// 당일
			if (
				targetDate.getDate() === todayDate.getDate() &&
				targetDate.getMonth() === todayDate.getMonth() &&
				targetDate.getFullYear() === todayDate.getFullYear()
			) {
				if (diffHours < 3) {
					return `${diffHours}시간 전`;
				}
				return `오늘 ${getTimeString(targetDate)}`;
			}

			// 어제
			if (diffDays === 1) {
				return `어제 ${getTimeString(targetDate)}`;
			}

			// 2일 전
			if (diffDays === 2) {
				return `2일 전 ${getTimeString(targetDate)}`;
			}

			// 올해 안의 날짜
			if (targetDate.getFullYear() === todayDate.getFullYear()) {
				const month = targetDate.getMonth() + 1;
				const day = targetDate.getDate();
				return `${month}월 ${day}일 ${getTimeString(targetDate)}`;
			}

			// 작년 이전 날짜
			const year = targetDate.getFullYear();
			const month = targetDate.getMonth() + 1;
			const day = targetDate.getDate();
			return `${year}년 ${month}월 ${day}일 ${getTimeString(targetDate)}`;
		}

		case 'detail': {
			const year = targetDate.getFullYear();
			const month = String(targetDate.getMonth() + 1).padStart(2, '0');
			const day = String(targetDate.getDate()).padStart(2, '0');
			const hours = String(targetDate.getHours()).padStart(2, '0');
			const minutes = String(targetDate.getMinutes()).padStart(2, '0');

			return `${year}-${month}-${day} ${hours}:${minutes}`;
		}

		case 'documentDate':
			return `${targetDate.getFullYear()}.${(targetDate.getMonth() + 1).toString().padStart(2, '0')}.${targetDate.getDate().toString().padStart(2, '0')}`;

		case 'collectDate': {
			const year = targetDate.getFullYear();
			const month = String(targetDate.getMonth() + 1).padStart(2, '0');
			const day = String(targetDate.getDate()).padStart(2, '0');
			const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
			const dayOfWeek = weekDays[targetDate.getDay()];

			return `${year}-${month}-${day} (${dayOfWeek})`;
		}

		default:
			return '';
	}
};
