import assertNever from '@utils/assertNever';
import { FEED_ESTIMATED_HEIGHT, SCHEDULING_SLOT_HEIGHT } from '@constants/feed';
import type { FeedData } from '@type/feed';

const estimateFeedHeight = (feed: FeedData): number => {
	switch (feed.feedType) {
		case 'NORMAL':
			return FEED_ESTIMATED_HEIGHT.NORMAL;
		case 'COLLECT':
			return FEED_ESTIMATED_HEIGHT.COLLECT;
		case 'SCHEDULING': {
			const { minTimeSegment, maxTimeSegment } = feed.details;
			const timeSegmentCount = maxTimeSegment - minTimeSegment;

			return FEED_ESTIMATED_HEIGHT.SCHEDULING_BASE + timeSegmentCount * SCHEDULING_SLOT_HEIGHT;
		}
		default:
			return assertNever(feed, 'Unsupported feed type');
	}
};

export default estimateFeedHeight;
