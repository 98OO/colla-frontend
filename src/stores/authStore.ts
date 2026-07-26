import { create } from 'zustand';
import type { AuthStatus, AuthUnavailableReason } from '@type/auth';

interface AuthState {
	accessToken: string | null;
	status: AuthStatus;
	sessionVersion: number;
	unavailableReason: AuthUnavailableReason | null;
	initializeSession: (token: string) => void;
	updateSession: (token: string) => void;
	clearSession: () => void;
	startBootstrapping: () => void;
	setSessionUnavailable: (reason: AuthUnavailableReason) => void;
}

const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	status: 'bootstrapping',
	sessionVersion: 0,
	unavailableReason: null,
	initializeSession: (token) =>
		set((state) => ({
			accessToken: token,
			status: 'authenticated',
			sessionVersion: state.sessionVersion + 1,
			unavailableReason: null,
		})),
	updateSession: (token) =>
		set({ accessToken: token, status: 'authenticated', unavailableReason: null }),
	clearSession: () =>
		set((state) => ({
			accessToken: null,
			status: 'guest',
			sessionVersion: state.sessionVersion + 1,
			unavailableReason: null,
		})),
	startBootstrapping: () => set({ status: 'bootstrapping', unavailableReason: null }),
	setSessionUnavailable: (reason) => set({ status: 'unavailable', unavailableReason: reason }),
}));

export default useAuthStore;
