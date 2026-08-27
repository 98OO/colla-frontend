import { create } from 'zustand';
import type { AuthStatus, AuthUnavailableReason } from '@type/auth';

interface AuthState {
	accessToken: string | null;
	status: AuthStatus;
	hasTeam: boolean | null;
	sessionVersion: number;
	unavailableReason: AuthUnavailableReason | null;
	initializeSession: (token: string, hasTeam: boolean) => void;
	updateSession: (token: string, hasTeam: boolean) => void;
	setHasTeam: (hasTeam: boolean) => void;
	clearSession: () => void;
	startBootstrapping: () => void;
	setSessionUnavailable: (reason: AuthUnavailableReason) => void;
}

const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	status: 'bootstrapping',
	hasTeam: null,
	sessionVersion: 0,
	unavailableReason: null,
	initializeSession: (token, hasTeam) =>
		set((state) => ({
			accessToken: token,
			hasTeam,
			status: 'authenticated',
			sessionVersion: state.sessionVersion + 1,
			unavailableReason: null,
		})),
	updateSession: (token, hasTeam) =>
		set({ accessToken: token, hasTeam, status: 'authenticated', unavailableReason: null }),
	setHasTeam: (hasTeam) => set({ hasTeam }),
	clearSession: () =>
		set((state) => ({
			accessToken: null,
			hasTeam: null,
			status: 'guest',
			sessionVersion: state.sessionVersion + 1,
			unavailableReason: null,
		})),
	startBootstrapping: () => set({ status: 'bootstrapping', unavailableReason: null }),
	setSessionUnavailable: (reason) => set({ status: 'unavailable', unavailableReason: reason }),
}));

export default useAuthStore;
