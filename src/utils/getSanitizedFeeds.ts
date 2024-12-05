import DOMPurify from 'dompurify';
import type { FeedData } from '@type/feed';

export const getSanitizedFeeds = (dirtyFeeds: FeedData[]) => {
	const sanitizedFeeds = dirtyFeeds.map((feed) => {
		const { feedType, details } = feed;

		if (feedType === 'NORMAL' || feedType === 'COLLECT') {
			const sanitizedContent = DOMPurify.sanitize(details.content || '');

			if (feed.feedType === 'NORMAL') {
				return {
					...feed,
					details: {
						...feed.details,
						content: sanitizedContent,
					},
				};
			}

			if (feed.feedType === 'COLLECT') {
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
		}

		return feed;
	});

	return sanitizedFeeds;
};
