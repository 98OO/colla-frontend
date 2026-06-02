import { makeDefaultTimeOptions } from '@utils/post/scheduling/makeDefaultTimeOptions';
import type { TimeRange } from '@type/post';

export const DEFAULT_TIME_OPTIONS = makeDefaultTimeOptions();

export const DEFAULT_TIME_RANGE: TimeRange = {
	from: DEFAULT_TIME_OPTIONS[18],
	to: DEFAULT_TIME_OPTIONS[36],
};

export const USER_CONFIRM_MESSAGE = '작성 중인 내용이 있습니다. 정말 취소하시겠습니까?';
