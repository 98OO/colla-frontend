import { useEffect } from 'react';
import useSocketStore from '@stores/socketStore';

const useSocketNetworkRecovery = () => {
	useEffect(() => {
		const handleOnline = () => {
			const { connectionStatus, reconnectNow } = useSocketStore.getState();

			if (connectionStatus === 'reconnectWaiting' || connectionStatus === 'disconnected') {
				reconnectNow();
			}
		};

		window.addEventListener('online', handleOnline);

		return () => window.removeEventListener('online', handleOnline);
	}, []);
};

export default useSocketNetworkRecovery;
