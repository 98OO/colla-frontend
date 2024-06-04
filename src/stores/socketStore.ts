import { CompatClient } from '@stomp/stompjs';
import { create } from 'zustand';

interface ChatChannel {
	id: number;
	name: string;
	lastChatMessage: string;
	lastChatCreatedAt: string;
	unreadMessageCount: number;
}

type socketStore = {
	stompClient: CompatClient | null;
	setStompClient: (client: CompatClient | null) => void;
	chatMessageCount: number;
	increaseChatMessageCount: (number: number) => void;
	chatChannelList: ChatChannel[];
	setChatChannelList: (channels: ChatChannel[]) => void;
};

const useSocketStore = create<socketStore>((set) => ({
	stompClient: null,
	setStompClient: (client) => set({ stompClient: client }),
	chatMessageCount: 0,
	increaseChatMessageCount: (count) => set({ chatMessageCount: count }),
	chatChannelList: [],
	setChatChannelList: (channels) => set({ chatChannelList: channels }),
}));

export default useSocketStore;
