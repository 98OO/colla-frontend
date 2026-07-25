import { create } from 'zustand';

type AuthStatus = 'loading' | 'authenticated' | 'guest' | 'error';

interface AuthState {
	accessToken: string | null;
	status: AuthStatus;
	sessionVersion: number;
	initializeSession: (token: string) => void;
	updateSession: (token: string) => void;
	clearSession: () => void;
	setSessionError: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	status: 'loading',
	sessionVersion: 0,
	initializeSession: (token) =>
		set((state) => ({
			accessToken: token,
			status: 'authenticated',
			sessionVersion: state.sessionVersion + 1,
		})),
	updateSession: (token) => set({ accessToken: token, status: 'authenticated' }),
	clearSession: () =>
		set((state) => ({
			accessToken: null,
			status: 'guest',
			sessionVersion: state.sessionVersion + 1,
		})),
	setSessionError: () => set({ status: 'error' }),
}));

export default useAuthStore;
