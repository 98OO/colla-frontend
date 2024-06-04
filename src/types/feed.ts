export type FeedType = 'NORMAL' | 'COLLECT' | 'VOTE' | 'SCHEDULING';

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

export type FeedData = NormalFeed | CollectFeed;
