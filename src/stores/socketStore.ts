import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';
import { WEBSOCKET_URL } from '@constants/api';

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
	connect: (accessToken: string) => void;
	disconnect: () => void;
	chatMessageCount: number | null;
	increaseChatMessageCount: (number: number | null) => void;
	chatChannelList: ChatChannel[];
	setChatChannelList: (channels: ChatChannel[]) => void;
};

const useSocketStore = create<socketStore>((set, get) => ({
	stompClient: null,
	setStompClient: (client) => set({ stompClient: client }),
	connect: (accessToken) => {
		if (get().stompClient?.connected) return;

		const client = Stomp.over(() => new SockJS(`${WEBSOCKET_URL}${accessToken}`));
		client.debug = () => {};
		client.connect({}, () => set({ stompClient: client }));
	},
	disconnect: () => {
		get().stompClient?.disconnect();
		set({
			stompClient: null,
			chatMessageCount: null,
			chatChannelList: [],
		});
	},
	chatMessageCount: null,
	increaseChatMessageCount: (count) => set({ chatMessageCount: count }),
	chatChannelList: [],
	setChatChannelList: (channels) => set({ chatChannelList: channels }),
}));

export default useSocketStore;
