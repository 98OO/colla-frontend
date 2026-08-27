import { useCallback, useMemo, useState } from 'react';
import { defaultRangeExtractor, type Range } from '@tanstack/react-virtual';
import type { FeedData } from '@type/feed';

const usePinnedEditingFeeds = (feeds: FeedData[]) => {
	const [editingFeedIds, setEditingFeedIds] = useState<Set<number>>(() => new Set());

	const editingIndexes = useMemo(() => {
		const indexes = new Set<number>();

		feeds.forEach((feed, index) => {
			if (editingFeedIds.has(feed.feedId)) indexes.add(index);
		});

		return indexes;
	}, [editingFeedIds, feeds]);

	const extractRangeWithEditingFeeds = useCallback(
		(range: Range) => {
			const defaultIndexes = defaultRangeExtractor(range);

			if (editingIndexes.size === 0) return defaultIndexes;

			const indexes = new Set(defaultIndexes);
			editingIndexes.forEach((index) => indexes.add(index));

			return [...indexes].sort((a, b) => a - b);
		},
		[editingIndexes]
	);

	const handleSchedulingEditChange = useCallback((feedId: number, isEditing: boolean) => {
		setEditingFeedIds((currentIds) => {
			if (currentIds.has(feedId) === isEditing) return currentIds;

			const nextIds = new Set(currentIds);

			if (isEditing) nextIds.add(feedId);
			else nextIds.delete(feedId);

			return nextIds;
		});
	}, []);

	return {
		editingFeedIds,
		extractRangeWithEditingFeeds,
		handleSchedulingEditChange,
	};
};

export default usePinnedEditingFeeds;
