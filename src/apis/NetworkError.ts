export class NetworkError extends Error {
	constructor(message = '네트워크 연결을 확인할 수 없습니다.') {
		super(message);

		this.name = 'NetworkError';

		Object.setPrototypeOf(this, NetworkError.prototype);
	}
}
