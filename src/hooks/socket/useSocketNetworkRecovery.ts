import { useEffect } from 'react';
import useSocketStore from '@stores/socketStore';

const useSocketNetworkRecovery = () => {
	const connectionStatus = useSocketStore((state) => state.connectionStatus);
	const reconnectNow = useSocketStore((state) => state.reconnectNow);

	useEffect(() => {
		const handleOnline = () => {
			if (connectionStatus === 'reconnectWaiting') reconnectNow();
		};

		window.addEventListener('online', handleOnline);

		return () => window.removeEventListener('online', handleOnline);
	}, [connectionStatus, reconnectNow]);
};

export default useSocketNetworkRecovery;
