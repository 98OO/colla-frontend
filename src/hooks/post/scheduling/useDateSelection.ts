import { useCallback, useEffect, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useToastStore from '@stores/toastStore';
import { MAX_TARGET_DATES, MAX_TARGET_DATES_MESSAGE } from '@constants/post';
import type { DateString } from '@type/post';

type DragMode = 'add' | 'remove';

const useDateSelection = (setSelectedDates: Dispatch<SetStateAction<Set<DateString>>>) => {
	const dragModeRef = useRef<DragMode>('add');
	const draggingRef = useRef(false);
	const limitReachedRef = useRef(false);

	const { makeToast } = useToastStore();

	const notifyLimitReached = useCallback(() => {
		if (limitReachedRef.current) return;

		limitReachedRef.current = true;
		makeToast(MAX_TARGET_DATES_MESSAGE, 'Warning');
	}, [makeToast]);

	useEffect(() => {
		const handleGlobalPointerUp = () => {
			draggingRef.current = false;
			limitReachedRef.current = false;
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
					return next;
				}

				dragModeRef.current = 'add';

				if (prev.size >= MAX_TARGET_DATES) {
					notifyLimitReached();
					return prev;
				}

				next.add(dateStr);
				return next;
			});
		},
		[setSelectedDates, notifyLimitReached]
	);

	const handlePointerEnter = useCallback(
		(dateStr: DateString, isPast: boolean) => {
			if (!draggingRef.current || isPast) return;

			setSelectedDates((prev) => {
				if (dragModeRef.current === 'add' && prev.has(dateStr)) return prev;
				if (dragModeRef.current === 'remove' && !prev.has(dateStr)) return prev;

				if (dragModeRef.current === 'add' && prev.size >= MAX_TARGET_DATES) {
					notifyLimitReached();
					return prev;
				}

				const next = new Set<DateString>(prev);

				if (dragModeRef.current === 'add') next.add(dateStr);
				else next.delete(dateStr);

				return next;
			});
		},
		[setSelectedDates, notifyLimitReached]
	);

	const handlePointerUp = useCallback(() => {
		draggingRef.current = false;
		limitReachedRef.current = false;
	}, []);

	return { handlePointerDown, handlePointerEnter, handlePointerUp };
};

export default useDateSelection;
