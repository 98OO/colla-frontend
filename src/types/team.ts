interface Tag {
	id: number;
	name: string;
}

interface User {
	id: number;
	profileImageUrl: string;
	username: string;
	email: string;
	role: string;
	tag: Tag | null;
}

export interface TeamSetting {
	profileImageUrl: string;
	name: string;
	tags: Tag[];
	users: User[];
}

interface TeamUserState {
	id: number;
	tagId: number | null;
}

export interface TeamState {
	profileImageUrl: string | null;
	name: string;
	users: TeamUserState[];
}

export interface TeamSettingResult {
	profileImageUrl?: string;
	name?: string;
	users?: {
		id: number;
		tagId: number | null;
	}[];
}

export interface UnreadMessageCountResponse {
	unreadMessageCount: number;
}
