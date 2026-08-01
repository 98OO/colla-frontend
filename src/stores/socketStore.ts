import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';
import {
	WEBSOCKET_RECONNECT_DELAY,
	WEBSOCKET_RECONNECT_TIMEOUT,
	WEBSOCKET_URL,
} from '@constants/api';

export type SocketConnectionStatus =
	| 'connecting'
	| 'reconnectWaiting'
	| 'connected'
	| 'disconnected';

interface ChatChannel {
	id: number;
	name: string;
	lastChatMessage: string;
	lastChatCreatedAt: string;
	unreadMessageCount: number;
}

let pendingStompClient: Client | null = null;
let socketAccessToken: string | null = null;
let manualReconnectClient: Client | null = null;
let reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null;

const clearReconnectTimeout = () => {
	if (!reconnectTimeoutId) return;

	clearTimeout(reconnectTimeoutId);
	reconnectTimeoutId = null;
};

type socketStore = {
	stompClient: Client | null;
	stompConnectionVersion: number;
	connectionStatus: SocketConnectionStatus;
	setStompClient: (client: Client | null) => void;
	connect: (accessToken: string) => void;
	reconnectNow: () => void;
	disconnect: () => void;
	chatMessageCount: number | null;
	increaseChatMessageCount: (number: number | null) => void;
	chatChannelList: ChatChannel[];
	setChatChannelList: (channels: ChatChannel[]) => void;
};

const useSocketStore = create<socketStore>((set, get) => ({
	stompClient: null,
	stompConnectionVersion: 0,
	connectionStatus: 'disconnected',
	setStompClient: (client) => set({ stompClient: client }),
	connect: (accessToken) => {
		if (get().stompClient?.active || pendingStompClient?.active) return;

		socketAccessToken = accessToken;
		set({ connectionStatus: 'connecting' });
		let client: Client;

		const isCurrentClient = () => pendingStompClient === client || get().stompClient === client;

		client = new Client({
			webSocketFactory: () => new SockJS(`${WEBSOCKET_URL}${accessToken}`),
			reconnectDelay: WEBSOCKET_RECONNECT_DELAY,
			beforeConnect: () => {
				if (!isCurrentClient()) return;

				set({ connectionStatus: 'connecting' });
			},
			onConnect: () => {
				if (!isCurrentClient()) return;

				pendingStompClient = null;
				clearReconnectTimeout();
				set((state) => ({
					stompClient: client,
					stompConnectionVersion: state.stompConnectionVersion + 1,
					connectionStatus: 'connected',
				}));
			},
			onWebSocketClose: () => {
				if (!isCurrentClient()) return;

				if (!client.active) {
					set({ connectionStatus: 'disconnected' });
					return;
				}

				set({ connectionStatus: 'reconnectWaiting' });

				if (reconnectTimeoutId) return;

				reconnectTimeoutId = setTimeout(() => {
					if (!isCurrentClient() || client.connected || !client.active) return;

					client.deactivate({ force: true });
					set({ connectionStatus: 'disconnected' });
				}, WEBSOCKET_RECONNECT_TIMEOUT);
			},
			onWebSocketError: () => {
				if (!isCurrentClient()) return;

				set({ connectionStatus: client.active ? 'reconnectWaiting' : 'disconnected' });
			},
			onStompError: () => {
				if (!isCurrentClient()) return;

				set({ connectionStatus: client.active ? 'reconnectWaiting' : 'disconnected' });
			},
			debug: () => {},
		});

		pendingStompClient = client;
		client.activate();
	},
	reconnectNow: () => {
		const client = get().stompClient ?? pendingStompClient;

		if (!client || client.connected || manualReconnectClient || !socketAccessToken) return;

		clearReconnectTimeout();
		manualReconnectClient = client;
		set({ connectionStatus: 'connecting' });

		client.deactivate({ force: true }).finally(() => {
			if (manualReconnectClient !== client) return;

			manualReconnectClient = null;

			const isCurrentClient = get().stompClient === client || pendingStompClient === client;
			if (!socketAccessToken || !isCurrentClient) return;

			if (pendingStompClient === client) pendingStompClient = null;
			get().connect(socketAccessToken);
		});
	},
	disconnect: () => {
		const client = get().stompClient ?? pendingStompClient;

		pendingStompClient = null;
		socketAccessToken = null;
		manualReconnectClient = null;
		clearReconnectTimeout();
		client?.deactivate();

		set({
			stompClient: null,
			stompConnectionVersion: 0,
			connectionStatus: 'disconnected',
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
