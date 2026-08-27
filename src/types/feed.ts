import { FEED_SELECT_MAP } from '@constants/feed';

type FeedSelectMap = typeof FEED_SELECT_MAP;

export type FeedFilter = FeedSelectMap[keyof FeedSelectMap];

export type FeedType = Exclude<FeedFilter, 'ALL'>;

export type SelectType = keyof FeedSelectMap;

export type FeedMenuType = Lowercase<FeedType>;

export interface Author {
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
	id: number;
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
	content: string;
}

export interface SubTaskResponse {
	title: string | null;
	status: 'PENDING' | 'COMPLETED';
	updatedAt: string;
	content: string | null;
	author: Author;
}

export interface CollectResponse {
	title: string | null;
	status: 'PENDING' | 'COMPLETED';
	updatedAt: string;
	author: Author;
}

interface CollectDetails {
	content: string;
	dueAt: string | null;
	isClosed: boolean;
	responses: CollectResponse[];
}

export type AvailabilityFlag = 0 | 1;

export type UserAvailability = Record<string, AvailabilityFlag[]>;

export type TotalAvailability = Record<string, number[]>;

export type AvailabilityColumn = [string, number[]];

export interface SlotData {
	date: string;
	segment: number;
}

export interface SchedulingResponse {
	availabilities: UserAvailability;
	createdAt: string;
	user: {
		id: number;
		profileImageUrl: string;
		username: string;
	};
}

interface SchedulingDetails {
	dueAt: string;
	isClosed: boolean;
	minTimeSegment: number;
	maxTimeSegment: number;
	numOfParticipants: number;
	totalAvailability: TotalAvailability;
	responses: SchedulingResponse[];
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

export interface NormalFeed extends FeedBase {
	feedType: 'NORMAL';
	details: NormalDetails;
}

export interface CollectFeed extends FeedBase {
	feedType: 'COLLECT';
	details: CollectDetails;
}

export interface SchedulingFeed extends FeedBase {
	feedType: 'SCHEDULING';
	details: SchedulingDetails;
}

export interface NormalFeedForm {
	teamspaceId: number;
	title: string;
	images: Omit<Image, 'id'>[];
	attachments: Omit<Attachment, 'id'>[];
	details: { content: string };
}

export interface SchedulingFeedForm {
	title: string;
	details: {
		dueAt: string;
		minTimeSegment: number;
		maxTimeSegment: number;
		targetDates: string[];
	};
}

export interface CollectFeedForm {
	teamspaceId: number;
	title: string;
	images: Omit<Image, 'id'>[];
	attachments: Omit<Attachment, 'id'>[];
	details: { content: string; dueAt: string | null };
}

export type FeedData = NormalFeed | CollectFeed | SchedulingFeed;
