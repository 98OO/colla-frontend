export class HTTPError extends Error {
	status: number;

	content: { [key: string]: string } | null;

	code?: number;

	constructor(
		status: number,
		code?: number,
		content?: { [key: string]: string },
		message?: string
	) {
		super(message);

		this.name = 'HTTPError';
		this.status = status;
		this.content = content || null;
		this.code = code;

		Object.setPrototypeOf(this, HTTPError.prototype);
	}
}
