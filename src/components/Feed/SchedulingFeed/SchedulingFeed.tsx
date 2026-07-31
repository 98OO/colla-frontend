import BaseFeed from '@components/Feed/BaseFeed/BaseFeed';
import SchedulingContent from '@components/Feed/SchedulingFeed/SchedulingContent';
import type { SchedulingFeed } from '@type/feed';

interface SchedulingFeedProps {
	feedData: SchedulingFeed;
}

const SchedulingFeed = ({ feedData }: SchedulingFeedProps) => {
	return (
		<BaseFeed feedData={feedData}>
			<SchedulingContent feedData={feedData} />
		</BaseFeed>
	);
};

export default SchedulingFeed;
