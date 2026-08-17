export const FEED_SELECT_MAP = {
	전체: 'ALL',
	일반: 'NORMAL',
	자료수집: 'COLLECT',
	일정조율: 'SCHEDULING',
} as const;

export const FEED_INFINITE_SCROLL_PRELOAD_DISTANCE = 250;

export const FEED_VIRTUAL_OVERSCAN = 2;

export const FEED_ESTIMATED_HEIGHT = {
	NORMAL: 406,
	COLLECT: 636,
	SCHEDULING_BASE: 426,
} as const;

export const SCHEDULING_SLOT_HEIGHT = 20;

export const EDITOR_IMAGE_ERROR_MESSAGE = {
	NO_FILE_SELECTED: '파일이 선택되지 않았습니다. 다시 시도해주세요.',
	EXCEED_LIMIT: '파일 최대 허용 사이즈를 초과했습니다.',
};

export const REGEX = {
	DATA_URL: /<img\s+[^>]*src="data:image\/[^"]*"[^>]*>/g,
	IMG_SRC: /src="[^"]*"/,
};

export const PREVIEW_LIMIT = {
	comments: 1,
	attachments: 1,
};
