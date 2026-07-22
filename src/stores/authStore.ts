import { create } from 'zustand';

type AuthStatus = 'loading' | 'authenticated' | 'guest';

interface AuthState {
	accessToken: string | null;
	status: AuthStatus;
	setAccessToken: (token: string) => void;
	clearSession: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	status: 'loading',
	setAccessToken: (token) => set({ accessToken: token, status: 'authenticated' }),
	clearSession: () => set({ accessToken: null, status: 'guest' }),
}));

export default useAuthStore;
