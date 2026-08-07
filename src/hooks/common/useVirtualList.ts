import { useVirtualizer } from '@tanstack/react-virtual';

interface UseVirtualListProps<T> {
	items: T[];
	scrollElement: HTMLDivElement | null;
	getItemKey: (item: T) => string | number;
	estimateSize: (index: number) => number;
	initialOffset?: number;
	enabled?: boolean;
	useFlushSync?: boolean;
	overscan?: number;
}

const useVirtualList = <T>({
	items,
	scrollElement,
	getItemKey,
	estimateSize,
	initialOffset,
	enabled = true,
	useFlushSync = true,
	overscan = 5,
}: UseVirtualListProps<T>) => {
	return useVirtualizer({
		count: items.length,
		getScrollElement: () => scrollElement,
		getItemKey: (index) => getItemKey(items[index]),
		estimateSize,
		initialOffset,
		enabled,
		useFlushSync,
		overscan,
	});
};

export default useVirtualList;
