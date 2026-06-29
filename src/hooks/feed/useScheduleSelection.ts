import { useRef, useState, type PointerEvent } from 'react';

type DragMode = 'add' | 'remove';
type Position = { x: number; y: number };
type Area = { left: number; right: number; top: number; bottom: number };

const getDragArea = (a: Position, b: Position): Area => ({
	left: Math.min(a.x, b.x),
	right: Math.max(a.x, b.x),
	top: Math.min(a.y, b.y),
	bottom: Math.max(a.y, b.y),
});

const isOverlapping = (a: Area, b: Area) =>
	a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

const useSelection = (isEditable: boolean, initialSlots: Set<string> = new Set()) => {
	const [selectedSlots, setSelectedSlots] = useState<Set<string>>(initialSlots);

	const draggingRef = useRef(false);
	const dragModeRef = useRef<DragMode>('add');
	const dragSelectionRef = useRef<Set<string>>(new Set());

	const gridRef = useRef<HTMLDivElement>(null);
	const startPointRef = useRef<Position | null>(null);

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

	const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
		if (!isEditable) return;

		const gridRect = gridRef.current?.getBoundingClientRect();
		if (!gridRect) return;

		startPointRef.current = { x: e.clientX - gridRect.left, y: e.clientY - gridRect.top };

		const startSlotEl = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-slot-id]');
		if (!startSlotEl) return;

		const { slotId } = (startSlotEl as HTMLElement).dataset;
		if (!slotId) return;

		draggingRef.current = true;
		dragSelectionRef.current = new Set(selectedSlots);
		dragModeRef.current = selectedSlots.has(slotId) ? 'remove' : 'add';

		updateSelection(slotId, startSlotEl);
	};

	const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
		if (!isEditable || !draggingRef.current) return;

		const gridRect = gridRef.current?.getBoundingClientRect();
		const startPoint = startPointRef.current;
		if (!gridRect || !startPoint) return;

		const curPoint = { x: e.clientX - gridRect.left, y: e.clientY - gridRect.top };
		const dragArea = getDragArea(startPoint, curPoint);

		gridRef.current?.querySelectorAll('[data-slot-id]').forEach((slotEl) => {
			const slotRect = slotEl.getBoundingClientRect();
			const slotArea = {
				left: slotRect.left - gridRect.left,
				right: slotRect.right - gridRect.left,
				top: slotRect.top - gridRect.top,
				bottom: slotRect.bottom - gridRect.top,
			};

			if (!isOverlapping(dragArea, slotArea)) return;

			const { slotId } = (slotEl as HTMLElement).dataset;
			if (slotId) updateSelection(slotId, slotEl);
		});
	};

	const commitSelection = () => {
		if (!draggingRef.current) return;

		draggingRef.current = false;
		setSelectedSlots(new Set(dragSelectionRef.current));
	};

	const isSelected = (slotId: string) => selectedSlots.has(slotId);

	return {
		gridRef,
		selectedSlots,
		handlePointerDown,
		handlePointerMove,
		commitSelection,
		isSelected,
	};
};

export default useSelection;
