import { makeDefaultTimeOptions } from '@utils/post/scheduling/makeDefaultTimeOptions';
import type { Period, TimeRange } from '@type/post';

export const PERIOD_OPTIONS = ['오전', '오후'] as const satisfies Period[];

export const DEFAULT_TIME_OPTIONS = makeDefaultTimeOptions();

export const DEFAULT_TIME_RANGE: TimeRange = {
	from: { period: '오전', time: DEFAULT_TIME_OPTIONS[18] },
	to: { period: '오후', time: DEFAULT_TIME_OPTIONS[36] },
};

export const USER_CONFIRM_MESSAGE = '작성 중인 내용이 있습니다. 정말 취소하시겠습니까?';
