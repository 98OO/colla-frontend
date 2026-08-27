import CollectDetail from '@components/Feed/Detail/Collect/CollectDetail';
import NormalDetail from '@components/Feed/Detail/Normal/NormalDetail';
import SchedulingDetail from '@components/Feed/Detail/Scheduling/SchedulingDetail';
import assertNever from '@utils/assertNever';
import type { FeedData } from '@type/feed';

interface FeedDetailContentProps {
	feedData: FeedData;
}

const FeedDetailContent = ({ feedData }: FeedDetailContentProps) => {
	switch (feedData.feedType) {
		case 'NORMAL':
			return <NormalDetail feedData={feedData} />;
		case 'COLLECT':
			return <CollectDetail feedData={feedData} />;
		case 'SCHEDULING':
			return <SchedulingDetail feedData={feedData} />;
		default:
			return assertNever(feedData, 'Unsupported feed type');
	}
};

export default FeedDetailContent;
