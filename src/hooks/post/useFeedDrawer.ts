import { useState } from 'react';
import { useOverlay } from '@hooks/common/useOverlay';

const useFeedDrawer = () => {
	const { open, close, isOpen } = useOverlay();
	const [openFeedId, setOpenFeedId] = useState<number | null>(null);

	const openDrawer = (feedId: number) => {
		setOpenFeedId(feedId);
		open();
	};

	const closeDrawer = () => {
		setOpenFeedId(null);
		close();
	};

	const isDrawerOpen = (feedId: number) => {
		return isOpen && openFeedId === feedId;
	};

	return { openFeedId, openDrawer, closeDrawer, isDrawerOpen };
};

export default useFeedDrawer;
