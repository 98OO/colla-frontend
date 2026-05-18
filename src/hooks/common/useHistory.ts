import { useEffect, useCallback } from 'react';
import useUpdatableRef from '@hooks/common/useUpdatableRef';

const useHistory = <T>(initialEntryData: T, onPopState: (entryData: T) => void) => {
	const onPopStateRef = useUpdatableRef(onPopState);

	useEffect(() => {
		window.history.replaceState({ entryData: initialEntryData }, '', window.location.href);
	}, []);

	useEffect(() => {
		const handlePopState = (event: PopStateEvent) => {
			if (event.state?.entryData != null) {
				onPopStateRef.current(event.state.entryData);
			}
		};

		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	const push = useCallback((nextEntryData: T) => {
		window.history.pushState({ entryData: nextEntryData }, '', window.location.href);
	}, []);

	const replace = useCallback((nextEntryData: T) => {
		window.history.replaceState({ entryData: nextEntryData }, '');
	}, []);

	const back = useCallback(() => {
		window.history.back();
	}, []);

	return { push, replace, back };
};

export default useHistory;
