import type { HTTPError } from '@apis/HTTPError';
import type { NetworkError } from '@apis/NetworkError';

export type AuthStatus = 'bootstrapping' | 'authenticated' | 'guest' | 'unavailable';

export type AuthUnavailableReason =
	| { type: 'network' }
	| { type: 'server'; status: number; code?: number }
	| { type: 'client'; status: number; code?: number };

export type TokenRefreshResult =
	| { type: 'success'; accessToken: string }
	| { type: 'invalid-session' }
	| { type: 'unavailable'; error: HTTPError | NetworkError }
	| { type: 'canceled' };
