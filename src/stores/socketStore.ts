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

let pendingStompClient: Client | null = null;

type socketStore = {
	stompClient: Client | null;
	stompConnectionVersion: number;
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
	stompConnectionVersion: 0,
	setStompClient: (client) => set({ stompClient: client }),
	connect: (accessToken) => {
		if (get().stompClient?.active || pendingStompClient?.active) return;

		const client = new Client({
			webSocketFactory: () => new SockJS(`${WEBSOCKET_URL}${accessToken}`),
			reconnectDelay: WEBSOCKET_RECONNECT_DELAY,
			onConnect: () => {
				if (pendingStompClient !== client && get().stompClient !== client) return;

				pendingStompClient = null;
				set((state) => ({
					stompClient: client,
					stompConnectionVersion: state.stompConnectionVersion + 1,
				}));
			},
			debug: () => {},
		});

		pendingStompClient = client;
		client.activate();
	},
	disconnect: () => {
		const client = get().stompClient ?? pendingStompClient;

		pendingStompClient = null;
		client?.deactivate();

		set({
			stompClient: null,
			stompConnectionVersion: 0,
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
