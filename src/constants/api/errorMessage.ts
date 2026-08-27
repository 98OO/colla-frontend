import { HTTP_STATUS_CODE } from './httpStatus';

export interface ErrorMessage {
	HEADING: string;
	BODY: string[];
	BUTTON: string;
}

export const HTTP_ERROR_MESSAGE = {
	[HTTP_STATUS_CODE.FORBIDDEN]: {
		HEADING: '접근 권한이 없어요',
		BODY: [
			'이 페이지를 볼 수 있는 권한이 없습니다',
			'팀스페이스에서 나갔거나 권한이 변경되었을 수 있습니다',
			'필요한 경우 팀스페이스 관리자에게 문의해주세요',
		],
		BUTTON: '홈으로 이동',
	},
	[HTTP_STATUS_CODE.NOT_FOUND]: {
		HEADING: '길을 잃으셨나요?',
		BODY: [
			'페이지를 찾을 수 없습니다',
			'존재하지 않는 주소를 입력하셨거나',
			'요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다',
		],
		BUTTON: '홈으로 이동',
	},
	[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR]: {
		HEADING: '앗, 뭔가 문제가 생겼어요..',
		BODY: [
			'서비스와 연결할 수 없습니다',
			'문제를 해결하기 위해 열심히 노력하고 있습니다',
			'잠시 후 다시 확인해주세요',
		],
		BUTTON: '다시 시도',
	},
	NETWORK: {
		HEADING: '연결이 불안정해요',
		BODY: ['서버에 연결하지 못했습니다', '네트워크 상태를 확인한 뒤', '다시 시도해주세요'],
		BUTTON: '다시 시도',
	},
	DEFAULT: {
		HEADING: '앗, 뭔가 문제가 생겼어요..',
		BODY: [
			'일시적인 오류로 현재 요청사항을 처리하는데 실패했습니다',
			'잠시 후 다시 한 번 시도해주세요',
			'지속적으로 발생할 경우 새로 고침하거나 다른 페이지로 이동해주세요',
		],
		BUTTON: '다시 시도',
	},
} satisfies Record<PropertyKey, ErrorMessage>;

export const COMMON_ERROR_MESSAGE = {
	REQUEST_FAILED: '요청을 처리하지 못했어요. 잠시 후 다시 시도해 주세요',
	NETWORK: '네트워크 상태를 확인한 뒤 다시 시도해 주세요',
	TEAMSPACE_NOT_FOUND: '팀스페이스 정보를 찾을 수 없어요. 다시 시도해 주세요',
} as const;
