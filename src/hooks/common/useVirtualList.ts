import { useVirtualizer, type Range } from '@tanstack/react-virtual';

interface UseVirtualListProps<T> {
	items: T[];
	scrollElement: HTMLDivElement | null;
	initialOffset?: number;
	enabled?: boolean;
	useFlushSync?: boolean;
	overscan?: number;
	getItemKey: (item: T) => string | number;
	estimateSize: (index: number) => number;
	rangeExtractor?: (range: Range) => number[];
}

const useVirtualList = <T>({
	items,
	scrollElement,
	initialOffset,
	enabled = true,
	useFlushSync = true,
	overscan = 5,
	getItemKey,
	estimateSize,
	rangeExtractor,
}: UseVirtualListProps<T>) => {
	return useVirtualizer({
		count: items.length,
		initialOffset,
		enabled,
		useFlushSync,
		overscan,
		getScrollElement: () => scrollElement,
		getItemKey: (index) => getItemKey(items[index]),
		estimateSize,
		rangeExtractor,
	});
};

export default useVirtualList;
