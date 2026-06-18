import { makeDefaultTimeOptions } from '@utils/post/scheduling/makeDefaultTimeOptions';
import { resolveTimeOption } from '@utils/post/scheduling/resolveTimeOption';
import type { TimeRange } from '@type/post';

export const INTERVAL_MINUTES = 30;

export const DEFAULT_TIME_OPTIONS = makeDefaultTimeOptions(INTERVAL_MINUTES);

export const DEFAULT_TIME_RANGE: TimeRange = {
	from: resolveTimeOption(DEFAULT_TIME_OPTIONS, '09:00'),
	to: resolveTimeOption(DEFAULT_TIME_OPTIONS, '18:00'),
};

export const DEFAULT_DUE_TIME = resolveTimeOption(DEFAULT_TIME_OPTIONS, '18:00');

export const USER_CONFIRM_MESSAGE = '작성 중인 내용이 있습니다. 정말 취소하시겠습니까?';

export const DUE_AT_PAST_MESSAGE = '마감 일시가 이미 지났어요. 날짜를 다시 선택해 주세요';
