import { useEffect, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { formatDate } from '@utils/calendar/formatDate';
import { DateManager } from '@utils/common/DateManager';
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

	const handlePointerDown = (date: Date) => {
		if (DateManager.isPast(date)) return;

		draggingRef.current = true;

		setSelectedDates((prev) => {
			const dateStr = formatDate(date);
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
	};

	const handlePointerMove = (date: Date) => {
		if (!draggingRef.current || DateManager.isPast(date)) return;

		setSelectedDates((prev) => {
			const dateStr = formatDate(date);

			if (dragModeRef.current === 'add' && prev.has(dateStr)) return prev;
			if (dragModeRef.current === 'remove' && !prev.has(dateStr)) return prev;

			const next = new Set<DateString>(prev);

			if (dragModeRef.current === 'add') next.add(dateStr);
			else next.delete(dateStr);

			return next;
		});
	};

	const handlePointerUp = () => {
		draggingRef.current = false;
	};

	return { handlePointerDown, handlePointerMove, handlePointerUp };
};

export default useDateSelection;
