type TimeData = {
	hours: number;
	minutes: number;
};

type TimeResponse = {
	isSuccess: boolean;
	data: TimeData | null;
};

const validateInput = (timeStr: string): TimeResponse | null => {
	if (!timeStr) {
		return {
			isSuccess: false,
			data: null,
		};
	}
	return null;
};

const parseMilitaryTime = (cleanedTimeStr: string): TimeResponse | null => {
	const militaryPattern = /^(\d{1,2}):(\d{1,2})$/;
	const militaryMatch = cleanedTimeStr.match(militaryPattern);

	if (militaryMatch) {
		const hours = parseInt(militaryMatch[1], 10);
		const minutes = parseInt(militaryMatch[2], 10);

		if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
			return {
				isSuccess: true,
				data: { hours, minutes },
			};
		}
		return {
			isSuccess: false,
			data: null,
		};
	}
	return null;
};

const parseAmPmTime = (cleanedTimeStr: string): TimeResponse | null => {
	const ampmPattern = /^(오전|오후)\s*(\d{1,2}):(\d{1,2})$/;
	const ampmMatch = cleanedTimeStr.match(ampmPattern);

	if (ampmMatch) {
		const meridiem = ampmMatch[1];
		let hours = parseInt(ampmMatch[2], 10);
		const minutes = parseInt(ampmMatch[3], 10);

		if (minutes > 59 || hours > 12) {
			return {
				isSuccess: false,
				data: null,
			};
		}

		if (meridiem === '오후' && hours !== 12) {
			hours += 12;
		}
		if (meridiem === '오전' && hours === 12) {
			hours = 0;
		}

		return {
			isSuccess: true,
			data: { hours, minutes },
		};
	}

	return null;
};

const getParsedTime = (timeStr: string): TimeResponse => {
	const validationError = validateInput(timeStr);

	if (validationError) {
		return validationError;
	}

	const cleanedTimeStr = timeStr.trim();

	const militaryTimeResult = parseMilitaryTime(cleanedTimeStr);
	if (militaryTimeResult) {
		return militaryTimeResult;
	}

	const ampmTimeResult = parseAmPmTime(cleanedTimeStr);
	if (ampmTimeResult) {
		return ampmTimeResult;
	}

	return {
		isSuccess: false,
		data: null,
	};
};

export default getParsedTime;
