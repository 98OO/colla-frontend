import { create } from 'zustand';

interface FeedDetailStore {
	selectedFeedId: number | null;
}

const useFeedDetailStore = create<FeedDetailStore>(() => ({
	selectedFeedId: null,
}));

export const selectFeedDetail = (feedId: number) => {
	useFeedDetailStore.setState((state) => {
		if (state.selectedFeedId === feedId) return state;

		return { selectedFeedId: feedId };
	});
};

export const clearFeedDetail = () => {
	useFeedDetailStore.setState((state) => {
		if (state.selectedFeedId === null) return state;

		return { selectedFeedId: null };
	});
};

export default useFeedDetailStore;
