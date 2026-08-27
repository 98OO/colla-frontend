import { useEffect, useState } from 'react';

const useDelayedVisibility = (delayMs: number) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const displayDelayTimer = window.setTimeout(() => {
			setIsVisible(true);
		}, delayMs);

		return () => window.clearTimeout(displayDelayTimer);
	}, [delayMs]);

	return isVisible;
};

export default useDelayedVisibility;
