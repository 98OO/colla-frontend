import type { FeedType } from '@type/feed';

export const FEED_SELECT_MAP: Record<string, FeedType> = {
	전체: 'ALL',
	일반: 'NORMAL',
	자료수집: 'COLLECT',
};

export const EDITOR_IMAGE_ERROR_MESSAGE = {
	NO_FILE_SELECTED: '파일이 선택되지 않았습니다. 다시 시도해주세요.',
	EXCEED_LIMIT: '파일 최대 허용 사이즈를 초과했습니다.',
};

export const REGEX = {
	DATA_URL: /<img\s+[^>]*src="data:image\/[^"]*"[^>]*>/g,
	IMG_SRC: /src="[^"]*"/,
};
