import type { ReactNode } from 'react';
import type { Virtualizer } from '@tanstack/react-virtual';
import * as S from './VirtualList.styled';

interface VirtualListProps<T> {
	items: T[];
	virtualizer: Virtualizer<HTMLDivElement, Element>;
	renderItem: (item: T, index: number) => ReactNode;
}

const VirtualList = <T,>({ items, virtualizer, renderItem }: VirtualListProps<T>) => {
	return (
		<S.VirtualListContainer style={{ height: virtualizer.getTotalSize() }}>
			{virtualizer.getVirtualItems().map((virtualItem) => (
				<S.VirtualItem
					key={virtualItem.key}
					data-index={virtualItem.index}
					ref={virtualizer.measureElement}
					style={{ transform: `translateY(${virtualItem.start}px)` }}>
					{renderItem(items[virtualItem.index], virtualItem.index)}
				</S.VirtualItem>
			))}
		</S.VirtualListContainer>
	);
};

export default VirtualList;
