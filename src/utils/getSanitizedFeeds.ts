import DOMPurify from 'dompurify';
import type { FeedData } from '@type/feed';

export const getSanitizedFeeds = (dirtyFeeds: FeedData[]) => {
	const sanitizedFeeds = dirtyFeeds.map((feed) => {
		const sanitizedContent = DOMPurify.sanitize(feed.details.content || '');

		switch (feed.feedType) {
			case 'NORMAL': {
				return {
					...feed,
					details: {
						...feed.details,
						content: sanitizedContent,
					},
				};
			}
			case 'COLLECT': {
				const { dueAt, isClosed, responses } = feed.details;
				return {
					...feed,
					details: {
						...feed.details,
						content: sanitizedContent,
						dueAt,
						isClosed,
						responses,
					},
				};
			}
			default:
				return feed;
		}
	});

	return sanitizedFeeds;
};
