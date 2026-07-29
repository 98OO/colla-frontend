import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';
import { WEBSOCKET_RECONNECT_DELAY, WEBSOCKET_URL } from '@constants/api';

interface ChatChannel {
	id: number;
	name: string;
	lastChatMessage: string;
	lastChatCreatedAt: string;
	unreadMessageCount: number;
}

type socketStore = {
	stompClient: Client | null;
	setStompClient: (client: Client | null) => void;
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

		const client = new Client({
			webSocketFactory: () => new SockJS(`${WEBSOCKET_URL}${accessToken}`),
			reconnectDelay: WEBSOCKET_RECONNECT_DELAY,
			onConnect: () => set({ stompClient: client }),
			debug: () => {},
		});

		client.activate();
	},
	disconnect: () => {
		get().stompClient?.deactivate();
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
