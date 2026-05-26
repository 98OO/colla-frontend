import { useCallback, useEffect, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { DateString } from '@type/post';

type DragMode = 'add' | 'remove';

const useDateSelection = (setSelectedDates: Dispatch<SetStateAction<Set<DateString>>>) => {
	const dragModeRef = useRef<DragMode>('add');
	const draggingRef = useRef(false);

	useEffect(() => {
		const handleGlobalPointerUp = () => {
			draggingRef.current = false;
		};

		document.addEventListener('pointerup', handleGlobalPointerUp);
		return () => document.removeEventListener('pointerup', handleGlobalPointerUp);
	}, []);

	const handlePointerDown = useCallback(
		(dateStr: DateString, isPast: boolean) => {
			if (isPast) return;

			draggingRef.current = true;

			setSelectedDates((prev) => {
				const next = new Set<DateString>(prev);

				if (prev.has(dateStr)) {
					dragModeRef.current = 'remove';
					next.delete(dateStr);
				} else {
					dragModeRef.current = 'add';
					next.add(dateStr);
				}

				return next;
			});
		},
		[setSelectedDates]
	);

	const handlePointerEnter = useCallback(
		(dateStr: DateString, isPast: boolean) => {
			if (!draggingRef.current || isPast) return;

			setSelectedDates((prev) => {
				if (dragModeRef.current === 'add' && prev.has(dateStr)) return prev;
				if (dragModeRef.current === 'remove' && !prev.has(dateStr)) return prev;

				const next = new Set<DateString>(prev);

				if (dragModeRef.current === 'add') next.add(dateStr);
				else next.delete(dateStr);

				return next;
			});
		},
		[setSelectedDates]
	);

	const handlePointerUp = useCallback(() => {
		draggingRef.current = false;
	}, []);

	return { handlePointerDown, handlePointerEnter, handlePointerUp };
};

export default useDateSelection;
