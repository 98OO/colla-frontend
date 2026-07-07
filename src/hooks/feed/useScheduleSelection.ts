import { useRef, useState, type PointerEvent } from 'react';

const SLOT_SELECTOR = '[data-slot-id]';

type DragMode = 'add' | 'remove';
type Position = { x: number; y: number };
type Area = { left: number; right: number; top: number; bottom: number };
type SlotSnapshot = { slotId: string; slotEl: Element; slotArea: Area };

const toGridPosition = (e: PointerEvent<HTMLDivElement>, gridRect: DOMRect): Position => ({
	x: e.clientX - gridRect.left,
	y: e.clientY - gridRect.top,
});

const getDragArea = (a: Position, b: Position): Area => ({
	left: Math.min(a.x, b.x),
	right: Math.max(a.x, b.x),
	top: Math.min(a.y, b.y),
	bottom: Math.max(a.y, b.y),
});

const isOverlapping = (a: Area, b: Area) =>
	a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

const clampPositionToGrid = (position: Position, rect: DOMRect): Position => ({
	x: Math.min(Math.max(position.x, 0), rect.width),
	y: Math.min(Math.max(position.y, 0), rect.height),
});

const useSelection = (initialSlots: Set<string> = new Set()) => {
	const [selectedSlots, setSelectedSlots] = useState<Set<string>>(initialSlots);

	const draggingRef = useRef(false);
	const dragModeRef = useRef<DragMode>('add');
	const dragSelectionRef = useRef<Set<string>>(new Set());

	const gridRef = useRef<HTMLDivElement>(null);
	const startPositionRef = useRef<Position | null>(null);

	const gridRectRef = useRef<DOMRect | null>(null);
	const slotSnapshotsRef = useRef<SlotSnapshot[]>([]);

	const captureSlotSnapshots = (gridRect: DOMRect) => {
		const grid = gridRef.current;
		if (!grid) return;

		slotSnapshotsRef.current = Array.from(grid.querySelectorAll(SLOT_SELECTOR)).map((slotEl) => {
			const slotRect = slotEl.getBoundingClientRect();

			return {
				slotId: (slotEl as HTMLElement).dataset.slotId ?? '',
				slotEl,
				slotArea: {
					left: slotRect.left - gridRect.left,
					right: slotRect.right - gridRect.left,
					top: slotRect.top - gridRect.top,
					bottom: slotRect.bottom - gridRect.top,
				},
			};
		});
	};

	const updateSelection = (slotId: string, slotEl: Element) => {
		const dragMode = dragModeRef.current;
		const isSelected = dragSelectionRef.current.has(slotId);

		if (dragMode === 'add' && isSelected) return;
		if (dragMode === 'remove' && !isSelected) return;

		if (dragMode === 'add') {
			dragSelectionRef.current.add(slotId);
			slotEl.classList.add('selected');
		} else {
			dragSelectionRef.current.delete(slotId);
			slotEl.classList.remove('selected');
		}
	};

	const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
		if (draggingRef.current) return;

		const grid = gridRef.current;
		if (!grid) return;

		if (!(e.target instanceof Element)) return;

		const startSlotEl = e.target.closest(SLOT_SELECTOR);
		if (!startSlotEl) return;

		const { slotId } = (startSlotEl as HTMLElement).dataset;
		if (!slotId) return;

		const gridRect = grid.getBoundingClientRect();

		// 포인터 캡처는 그리드 밖에서도 이벤트를 계속 받고 pointerover/out 발생을 줄이기 위한 최적화입니다.
		// 실패해도 드래그는 정상 동작하며, 그리드를 벗어난 경우에는 onPointerLeave를 통해 드래그를 종료합니다.
		try {
			grid.setPointerCapture(e.pointerId);
		} catch {
			// no-op
		}

		gridRectRef.current = gridRect;
		startPositionRef.current = toGridPosition(e, gridRect);

		captureSlotSnapshots(gridRect);

		draggingRef.current = true;
		dragSelectionRef.current = new Set(selectedSlots);
		dragModeRef.current = selectedSlots.has(slotId) ? 'remove' : 'add';

		updateSelection(slotId, startSlotEl);
	};

	const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
		if (!draggingRef.current) return;

		const gridRect = gridRectRef.current;
		if (!gridRect) return;

		const startPosition = startPositionRef.current;
		if (!startPosition) return;

		const curPosition = toGridPosition(e, gridRect);
		const clampedPosition = clampPositionToGrid(curPosition, gridRect);
		const dragArea = getDragArea(startPosition, clampedPosition);

		slotSnapshotsRef.current.forEach(({ slotId, slotEl, slotArea }) => {
			if (!isOverlapping(dragArea, slotArea) || !slotId) return;

			updateSelection(slotId, slotEl);
		});
	};

	const commitSelection = () => {
		if (!draggingRef.current) return;

		draggingRef.current = false;
		setSelectedSlots(new Set(dragSelectionRef.current));

		slotSnapshotsRef.current = [];
		gridRectRef.current = null;
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
