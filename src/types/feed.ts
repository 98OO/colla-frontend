import { FEED_SELECT_MAP } from '@constants/feed';

export type FeedType = 'ALL' | 'NORMAL' | 'COLLECT' | 'VOTE' | 'SCHEDULING';

export type FeedMenuType = 'normal' | 'vote' | 'collect' | 'scheduling';

export type SelectType = keyof typeof FEED_SELECT_MAP;

interface Author {
	id: number;
	profileImageUrl: string | null;
	username: string;
	tag: {
		id: number;
		name: string;
	} | null;
}

interface Image {
	id: number;
	name: string;
	fileUrl: string;
	size: number;
}

interface Comment {
	author: Author;
	content: string;
	createdAt: string;
}

interface Attachment {
	id: number;
	name: string;
	fileUrl: string;
	size: number;
}

interface NormalDetails {
	content: string | null;
}

interface CollectResponse {
	title: string | null;
	status: 'PENDING' | 'COMPLETED';
	updatedAt: string;
	author: Author;
}

interface CollectDetails {
	content: string | null;
	dueAt: string | null;
	isClosed: boolean;
	responses: CollectResponse[];
}

interface FeedBase {
	feedId: number;
	author: Author;
	title: string;
	createdAt: string;
	comments: Comment[];
	images: Image[];
	attachments: Attachment[];
}

interface NormalFeed extends FeedBase {
	feedType: 'NORMAL';
	details: NormalDetails;
}

interface CollectFeed extends FeedBase {
	feedType: 'COLLECT';
	details: CollectDetails;
}

export interface NormalFeedForm {
	teamspaceId: number;
	title: string;
	images: Omit<Image, 'id'>[];
	details: { content: string };
}

export type FeedData = NormalFeed | CollectFeed;
