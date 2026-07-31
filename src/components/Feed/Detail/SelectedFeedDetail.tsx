import { useEffect } from 'react';
import Drawer from '@components/common/Drawer/Drawer';
import FeedDetailContent from '@components/Feed/Detail/FeedDetailContent';
import useFeedDetailStore, { clearFeedDetail } from '@stores/feedDetailStore';
import type { FeedData } from '@type/feed';

interface SelectedFeedDetailProps {
	feeds: FeedData[];
}

const SelectedFeedDetail = ({ feeds }: SelectedFeedDetailProps) => {
	const selectedFeedId = useFeedDetailStore((state) => state.selectedFeedId);
	const selectedFeed = feeds.find((feed) => feed.feedId === selectedFeedId);

	useEffect(() => {
		if (selectedFeedId !== null && !selectedFeed) {
			clearFeedDetail();
		}
	}, [selectedFeed, selectedFeedId]);

	if (!selectedFeed) return null;

	return (
		<Drawer isOpen onClose={clearFeedDetail}>
			<FeedDetailContent feedData={selectedFeed} />
		</Drawer>
	);
};

export default SelectedFeedDetail;
