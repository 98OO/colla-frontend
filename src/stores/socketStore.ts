import { Stomp, CompatClient } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';

interface SocketStore {
	client: CompatClient | null;
	connect: () => void;
}

const socketStore = create<SocketStore>((set) => ({
	client: null,
	connect: () => {
		const accessToken = localStorage.getItem('ACCESS_TOKEN');
		if (!accessToken) {
			return;
		}
		const socket = new SockJS(
			`http://localhost:8080/ws-stomp?accessToken=${accessToken}`
		);
		const client = Stomp.over(socket);
		client.connect({}, () => {
			set({ client });
		});
	},
}));

export default socketStore;
