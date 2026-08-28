import loadSocketClientModules from '@utils/socket/loadSocketClientModules';
import { create } from 'zustand';
import {
	WEBSOCKET_CONNECTION_TIMEOUT,
	WEBSOCKET_RECONNECT_INITIAL_DELAY,
	WEBSOCKET_RECONNECT_MAX_DELAY,
	WEBSOCKET_RECONNECT_TIMEOUT,
	WEBSOCKET_URL,
} from '@constants/api';
import type { Client } from '@stomp/stompjs';

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

let pendingClientSetup: Promise<void> | null = null;
let pendingStompClient: Client | null = null;
let socketAccessToken: string | null = null;
let manualReconnectClient: Client | null = null;
let reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null;
let reconnectAttemptCount = 0;

const clearReconnectTimeout = () => {
	if (!reconnectTimeoutId) return;

	clearTimeout(reconnectTimeoutId);
	reconnectTimeoutId = null;
};

const resetReconnectAttemptCount = () => {
	reconnectAttemptCount = 0;
};

const getNextReconnectDelay = () => {
	const nextReconnectDelay = Math.min(
		WEBSOCKET_RECONNECT_INITIAL_DELAY * 2 ** reconnectAttemptCount,
		WEBSOCKET_RECONNECT_MAX_DELAY
	);
	reconnectAttemptCount += 1;

	return nextReconnectDelay;
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
		if (pendingClientSetup || get().stompClient?.active || pendingStompClient?.active) return;

		clearReconnectTimeout();
		socketAccessToken = accessToken;
		resetReconnectAttemptCount();
		set({ connectionStatus: 'connecting' });

		const clientSetup = loadSocketClientModules()
			.then(({ Client: StompClient, SockJS }) => {
				if (pendingClientSetup !== clientSetup) return;

				let client: Client;
				const isCurrentClient = () => pendingStompClient === client || get().stompClient === client;

				client = new StompClient({
					webSocketFactory: () => new SockJS(`${WEBSOCKET_URL}${accessToken}`),
					connectionTimeout: WEBSOCKET_CONNECTION_TIMEOUT,
					reconnectDelay: WEBSOCKET_RECONNECT_INITIAL_DELAY,
					beforeConnect: () => {
						if (!isCurrentClient()) return;

						set({ connectionStatus: 'connecting' });
					},
					onConnect: () => {
						if (!isCurrentClient()) return;

						pendingStompClient = null;
						clearReconnectTimeout();
						resetReconnectAttemptCount();
						client.reconnectDelay = WEBSOCKET_RECONNECT_INITIAL_DELAY;
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

						client.reconnectDelay = getNextReconnectDelay();
						set({ connectionStatus: 'reconnectWaiting' });

						if (reconnectTimeoutId) return;

						reconnectTimeoutId = setTimeout(() => {
							reconnectTimeoutId = null;

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
			})
			.catch(() => {
				if (pendingClientSetup !== clientSetup) return;

				set({ connectionStatus: 'disconnected' });
			})
			.finally(() => {
				if (pendingClientSetup === clientSetup) pendingClientSetup = null;
			});

		pendingClientSetup = clientSetup;
	},
	reconnectNow: () => {
		const client = get().stompClient ?? pendingStompClient;

		if (!socketAccessToken || pendingClientSetup) return;

		if (!client) {
			get().connect(socketAccessToken);
			return;
		}

		if (client.connected || manualReconnectClient) return;

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
		pendingClientSetup = null;
		socketAccessToken = null;
		manualReconnectClient = null;
		resetReconnectAttemptCount();
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
