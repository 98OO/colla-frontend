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

	return (
		<Drawer isOpen={selectedFeed !== undefined} onClose={clearFeedDetail}>
			{selectedFeed && <FeedDetailContent feedData={selectedFeed} />}
		</Drawer>
	);
};

export default SelectedFeedDetail;
