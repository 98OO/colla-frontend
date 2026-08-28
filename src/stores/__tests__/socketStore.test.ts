import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { StompConfig } from '@stomp/stompjs';

const loadSocketClientModulesMock = vi.hoisted(() => vi.fn());

vi.mock('@utils/socket/loadSocketClientModules', () => ({
	default: loadSocketClientModulesMock,
}));

interface Deferred<T> {
	promise: Promise<T>;
	resolve: (value: T) => void;
	reject: (reason: unknown) => void;
}

const createDeferred = <T>(): Deferred<T> => {
	let resolve: Deferred<T>['resolve'] = () => {};
	let reject: Deferred<T>['reject'] = () => {};
	const promise = new Promise<T>((promiseResolve, promiseReject) => {
		resolve = promiseResolve;
		reject = promiseReject;
	});

	return { promise, resolve, reject };
};

interface MockStompClientRecord {
	activate: ReturnType<typeof vi.fn>;
	configuration: StompConfig;
}

class MockStompClient {
	static instances: MockStompClientRecord[] = [];

	active = false;

	connected = false;

	reconnectDelay = 0;

	activate = vi.fn(() => {
		this.active = true;
		this.configuration.beforeConnect?.();
	});

	deactivate = vi.fn(async () => {
		this.active = false;
		this.connected = false;
	});

	constructor(readonly configuration: StompConfig) {
		MockStompClient.instances.push(this);
	}
}

const MockSockJS = vi.fn();
const socketClientModules = {
	Client: MockStompClient,
	SockJS: MockSockJS,
};

const importSocketStore = async () => {
	vi.resetModules();
	const { default: useSocketStore } = await import('../socketStore');

	return useSocketStore;
};

const waitForTransport = async () => {
	await vi.waitFor(() => expect(MockStompClient.instances).toHaveLength(1));
};

describe('소켓 클라이언트 모듈 지연 로딩', () => {
	beforeEach(() => {
		loadSocketClientModulesMock.mockReset();
		MockStompClient.instances = [];
		MockSockJS.mockReset();
	});

	test('연결을 반복 요청해도 진행 중인 Client 준비 작업을 공유한다', async () => {
		const modulesDeferred = createDeferred<typeof socketClientModules>();
		loadSocketClientModulesMock.mockReturnValue(modulesDeferred.promise);
		const useSocketStore = await importSocketStore();

		useSocketStore.getState().connect('access-token');
		useSocketStore.getState().connect('access-token');

		expect(loadSocketClientModulesMock).toHaveBeenCalledTimes(1);
		expect(useSocketStore.getState().connectionStatus).toBe('connecting');

		modulesDeferred.resolve(socketClientModules);
		await waitForTransport();

		expect(MockStompClient.instances[0].activate).toHaveBeenCalledTimes(1);
	});

	test('모듈 로딩 중 연결을 해제하면 Client를 활성화하지 않는다', async () => {
		const modulesDeferred = createDeferred<typeof socketClientModules>();
		loadSocketClientModulesMock.mockReturnValue(modulesDeferred.promise);
		const useSocketStore = await importSocketStore();

		useSocketStore.getState().connect('access-token');
		useSocketStore.getState().disconnect();
		modulesDeferred.resolve(socketClientModules);
		await modulesDeferred.promise;
		await Promise.resolve();

		expect(MockStompClient.instances).toHaveLength(0);
		expect(useSocketStore.getState().connectionStatus).toBe('disconnected');
	});

	test('모듈 로딩 중 연결 해제 후 새로 시작한 Client만 활성화한다', async () => {
		const firstModulesDeferred = createDeferred<typeof socketClientModules>();
		const secondModulesDeferred = createDeferred<typeof socketClientModules>();
		loadSocketClientModulesMock
			.mockReturnValueOnce(firstModulesDeferred.promise)
			.mockReturnValueOnce(secondModulesDeferred.promise);
		const useSocketStore = await importSocketStore();

		useSocketStore.getState().connect('access-token');
		useSocketStore.getState().disconnect();
		useSocketStore.getState().connect('access-token');
		firstModulesDeferred.resolve(socketClientModules);
		await firstModulesDeferred.promise;
		await Promise.resolve();

		expect(MockStompClient.instances).toHaveLength(0);

		secondModulesDeferred.resolve(socketClientModules);
		await waitForTransport();

		expect(loadSocketClientModulesMock).toHaveBeenCalledTimes(2);
		expect(MockStompClient.instances).toHaveLength(1);
		expect(MockStompClient.instances[0].activate).toHaveBeenCalledTimes(1);
	});

	test('최초 모듈 로딩에 실패해도 다시 연결할 수 있다', async () => {
		loadSocketClientModulesMock.mockRejectedValueOnce(new Error('chunk load failed'));
		loadSocketClientModulesMock.mockResolvedValueOnce(socketClientModules);
		const useSocketStore = await importSocketStore();

		useSocketStore.getState().connect('access-token');
		await vi.waitFor(() => expect(useSocketStore.getState().connectionStatus).toBe('disconnected'));

		useSocketStore.getState().reconnectNow();
		await waitForTransport();

		expect(loadSocketClientModulesMock).toHaveBeenCalledTimes(2);
		expect(MockStompClient.instances[0].activate).toHaveBeenCalledTimes(1);
	});
});
