import { useRef, useState } from 'react';

type DragMode = 'add' | 'remove';

const useSelection = (isEditable: boolean, initialSlots: Set<string> = new Set()) => {
	const [isDragging, setIsDragging] = useState(false);
	const [selectedSlots, setSelectedSlots] = useState<Set<string>>(initialSlots);

	const dragModeRef = useRef<DragMode>('add');

	const updateSelection = (slotId: string) => {
		setSelectedSlots((prev) => {
			const isSelected = prev.has(slotId);

			if (dragModeRef.current === 'add' && isSelected) return prev;
			if (dragModeRef.current === 'remove' && !isSelected) return prev;

			const updated = new Set(prev);

			if (dragModeRef.current === 'add') {
				updated.add(slotId);
			} else {
				updated.delete(slotId);
			}

			return updated;
		});
	};

	const handlePointerDown = (slotId: string) => {
		if (!isEditable) return;

		setIsDragging(true);
		dragModeRef.current = selectedSlots.has(slotId) ? 'remove' : 'add';
		updateSelection(slotId);
	};

	const handlePointerEnter = (slotId: string) => {
		if (!isDragging || !isEditable) return;

		updateSelection(slotId);
	};

	const handlePointerUp = () => {
		if (!isEditable) return;

		setIsDragging(false);
	};

	const isSelected = (slotId: string) => selectedSlots.has(slotId);

	return {
		selectedSlots,
		setIsDragging,
		handlePointerDown,
		handlePointerEnter,
		handlePointerUp,
		isSelected,
	};
};

export default useSelection;
