import { create } from 'zustand';

type AuthStatus = 'loading' | 'authenticated' | 'guest' | 'error';

interface AuthState {
	accessToken: string | null;
	status: AuthStatus;
	sessionVersion: number;
	setAccessToken: (token: string) => void;
	clearSession: () => void;
	setSessionError: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	status: 'loading',
	sessionVersion: 0,
	setAccessToken: (token) => set({ accessToken: token, status: 'authenticated' }),
	clearSession: () =>
		set((state) => ({
			accessToken: null,
			status: 'guest',
			sessionVersion: state.sessionVersion + 1,
		})),
	setSessionError: () => set({ status: 'error' }),
}));

export default useAuthStore;
