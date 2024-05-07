import { create } from 'zustand';

interface UserInfo {
	userId: number;
	username: string;
	profileImageUrl: string;
	email: string;
	emailSubscription: boolean;
	commentNotification: string;
	lastSeenTeamspaceId: number;
}

interface UserState {
	userInfo: UserInfo | null;
	setUserInfo: (userInfo: UserInfo) => void;
}

const useUserStore = create<UserState>((set) => ({
	userInfo: null,
	setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
}));

export default useUserStore;
