import type { TimeString } from '@type/post';

export const resolveTimeOption = (options: TimeString[], time: string): TimeString => {
	const option = options.find((value) => value === time);

	if (!option) throw new Error(`기본 시간 옵션에 ${time}이(가) 존재하지 않습니다.`);

	return option;
};
