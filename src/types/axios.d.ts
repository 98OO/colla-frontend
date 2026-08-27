import 'axios';

declare module 'axios' {
	export interface AxiosRequestConfig {
		skipAuthorizationHeader?: boolean;
		isRetried?: boolean;
		sessionVersion?: number;
	}
}
