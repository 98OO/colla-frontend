import { memo } from 'react';
import CollectFeed from '@components/Feed/CollectFeed/CollectFeed';
import NormalFeed from '@components/Feed/NormalFeed/NormalFeed';
import SchedulingFeed from '@components/Feed/SchedulingFeed/SchedulingFeed';
import assertNever from '@utils/assertNever';
import type { FeedData } from '@type/feed';

interface FeedProps {
	feedData: FeedData;
	onSchedulingEditChange?: (feedId: number, isEditing: boolean) => void;
}

const Feed = memo(({ feedData, onSchedulingEditChange }: FeedProps) => {
	switch (feedData.feedType) {
		case 'NORMAL':
			return <NormalFeed feedData={feedData} />;
		case 'COLLECT':
			return <CollectFeed feedData={feedData} />;
		case 'SCHEDULING':
			return <SchedulingFeed feedData={feedData} onEditChange={onSchedulingEditChange} />;
		default:
			return assertNever(feedData, 'Unsupported feed type');
	}
});

Feed.displayName = 'Feed';

export default Feed;
