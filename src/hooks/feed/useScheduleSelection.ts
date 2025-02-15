import { useState } from 'react';

const useSelection = (
	isEditable: boolean,
	initialSlots: Set<string> = new Set()
) => {
	const [isDragging, setIsDragging] = useState(false);
	const [selectedSlots, setSelectedSlots] = useState<Set<string>>(initialSlots);

	const toggleSlotSelection = (slotId: string) => {
		setSelectedSlots((prev) => {
			const updated = new Set(prev);

			if (updated.has(slotId)) {
				updated.delete(slotId);
			} else {
				updated.add(slotId);
			}

			return updated;
		});
	};

	const handleMouseDown = (slotId: string) => {
		if (isEditable) {
			setIsDragging(true);
			toggleSlotSelection(slotId);
		}
	};

	const handleMouseEnter = (slotId: string) => {
		if (isDragging && isEditable) {
			toggleSlotSelection(slotId);
		}
	};

	const handleMouseUp = () => {
		if (isEditable) {
			setIsDragging(false);
		}
	};

	const isSelected = (slotId: string) => selectedSlots.has(slotId);

	return {
		setIsDragging,
		selectedSlots,
		toggleSlotSelection,
		handleMouseDown,
		handleMouseEnter,
		handleMouseUp,
		isSelected,
	};
};

export default useSelection;
