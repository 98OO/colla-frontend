import 'axios';

declare module 'axios' {
	export interface AxiosRequestConfig {
		authRequired?: boolean;
	}
}
