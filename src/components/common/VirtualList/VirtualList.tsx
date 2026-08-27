import type { ReactNode } from 'react';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import * as S from './VirtualList.styled';

interface VirtualListProps<T> {
	items: T[];
	virtualizer: Virtualizer<HTMLDivElement, Element>;
	renderItem: (item: T, index: number, virtualItem: VirtualItem) => ReactNode;
}

const VirtualList = <T,>({ items, virtualizer, renderItem }: VirtualListProps<T>) => {
	const virtualItems = virtualizer.getVirtualItems();

	return (
		<S.VirtualListContainer style={{ height: virtualizer.getTotalSize() }}>
			{virtualItems.map((virtualItem) => (
				<S.VirtualItem
					key={virtualItem.key}
					data-index={virtualItem.index}
					ref={virtualizer.measureElement}
					style={{ transform: `translateY(${virtualItem.start}px)` }}>
					{renderItem(items[virtualItem.index], virtualItem.index, virtualItem)}
				</S.VirtualItem>
			))}
		</S.VirtualListContainer>
	);
};

export default VirtualList;
