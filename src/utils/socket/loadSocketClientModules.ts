interface SocketClientModules {
	Client: typeof import('@stomp/stompjs').Client;
	SockJS: typeof import('sockjs-client');
}

const loadSocketClientModules = async (): Promise<SocketClientModules> => {
	const [{ Client }, { default: SockJS }] = await Promise.all([
		import('@stomp/stompjs'),
		import('sockjs-client'),
	]);

	return { Client, SockJS };
};

export default loadSocketClientModules;
