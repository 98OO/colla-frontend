import { useEffect, useRef, useState } from 'react';

type DragMode = 'add' | 'remove';

const useSelection = (isEditable: boolean, initialSlots: Set<string> = new Set()) => {
	const [selectedSlots, setSelectedSlots] = useState<Set<string>>(initialSlots);

	const draggingRef = useRef(false);
	const dragModeRef = useRef<DragMode>('add');
	const dragSelectionRef = useRef<Set<string>>(new Set());

	const updateSelection = (slotId: string, slotEl: Element) => {
		const isSelected = dragSelectionRef.current.has(slotId);

		if (dragModeRef.current === 'add' && isSelected) return;
		if (dragModeRef.current === 'remove' && !isSelected) return;

		if (dragModeRef.current === 'add') {
			dragSelectionRef.current.add(slotId);
			slotEl.classList.add('selected');
		} else {
			dragSelectionRef.current.delete(slotId);
			slotEl.classList.remove('selected');
		}
	};

	const handlePointerDown = (slotId: string, slotEl: Element) => {
		if (!isEditable) return;

		draggingRef.current = true;
		dragSelectionRef.current = new Set(selectedSlots);
		dragModeRef.current = selectedSlots.has(slotId) ? 'remove' : 'add';

		updateSelection(slotId, slotEl);
	};

	const handlePointerEnter = (slotId: string, slotEl: Element) => {
		if (!draggingRef.current || !isEditable) return;

		updateSelection(slotId, slotEl);
	};

	useEffect(() => {
		const commitSelection = () => {
			if (!draggingRef.current) return;

			draggingRef.current = false;
			setSelectedSlots(new Set(dragSelectionRef.current));
		};

		document.addEventListener('pointerup', commitSelection);
		document.addEventListener('pointercancel', commitSelection);

		return () => {
			document.removeEventListener('pointerup', commitSelection);
			document.removeEventListener('pointercancel', commitSelection);
		};
	}, []);

	const isSelected = (slotId: string) => selectedSlots.has(slotId);

	return {
		selectedSlots,
		handlePointerDown,
		handlePointerEnter,
		isSelected,
	};
};

export default useSelection;
