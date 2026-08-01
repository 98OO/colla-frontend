interface ChatChannel {
	id: number;
	name: string;
	unreadMessageCount: number;
	lastChatMessage: string | null;
	lastChatCreatedAt: string | null;
}

export interface ChatChannels {
	chatChannels: ChatChannel[];
}

interface User {
	id: number;
	username: string;
	profileImageUrl: string;
}

export interface Attachment {
	id: number;
	filename: string;
	size: number;
	url: string;
	content_type?: string;
	attachType?: string;
}

export interface Message {
	id: number;
	type: 'TEXT' | 'IMAGE' | 'FILE';
	chatChannelId: number;
	author: User;
	content: string;
	attachments: Attachment[];
	createdAt: string;
}

export interface ChatData {
	chatChannelMessages: Message[];
}

interface LocalMessageBase {
	id: string;
}

export interface LocalTextMessage extends LocalMessageBase {
	type: 'TEXT';
	content: string;
}

export interface LocalAttachmentMessage extends LocalMessageBase {
	type: 'IMAGE' | 'FILE';
	file: File;
	localUrl: string;
}

export type LocalChatMessage = LocalTextMessage | LocalAttachmentMessage;

export type Orientation = 'landscape' | 'portrait' | 'square';
