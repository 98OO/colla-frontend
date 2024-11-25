import CollectFeed from '@components/Feed/CollectFeed/CollectFeed';
import NormalFeed from '@components/Feed/NormalFeed/NormalFeed';
import SchedulingFeed from '@components/Feed/SchedulingFeed/SchedulingFeed';
import { FeedData } from '@type/feed';

interface FeedProps {
	feedData: FeedData;
	isDetailOpen: boolean;
	openDetail: () => void;
	closeDetail: () => void;
}

const Feed = ({
	feedData,
	isDetailOpen,
	openDetail,
	closeDetail,
}: FeedProps) => {
	const { feedId, feedType } = feedData;

	return (
		<>
			{feedType === 'NORMAL' && (
				<NormalFeed
					key={feedId}
					feedData={feedData}
					isDetailOpen={isDetailOpen}
					openDetail={openDetail}
					closeDetail={closeDetail}
				/>
			)}
			{feedType === 'COLLECT' && (
				<CollectFeed
					key={feedId}
					feedData={feedData}
					isDetailOpen={isDetailOpen}
					openDetail={openDetail}
					closeDetail={closeDetail}
				/>
			)}
			{feedType === 'SCHEDULING' && (
				<SchedulingFeed
					key={feedId}
					feedData={feedData}
					isDetailOpen={isDetailOpen}
					openDetail={openDetail}
					closeDetail={closeDetail}
				/>
			)}
		</>
	);
};

export default Feed;
