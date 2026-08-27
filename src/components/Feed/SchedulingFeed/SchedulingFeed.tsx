import BaseFeed from '@components/Feed/BaseFeed/BaseFeed';
import SchedulingContent from '@components/Feed/SchedulingFeed/SchedulingContent';
import type { SchedulingFeed } from '@type/feed';

interface SchedulingFeedProps {
	feedData: SchedulingFeed;
	onEditChange?: (feedId: number, isEditing: boolean) => void;
}

const SchedulingFeed = ({ feedData, onEditChange }: SchedulingFeedProps) => {
	return (
		<BaseFeed feedData={feedData}>
			<SchedulingContent feedData={feedData} onEditChange={onEditChange} />
		</BaseFeed>
	);
};

export default SchedulingFeed;
