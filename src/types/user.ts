export interface NewToken {
	code: number;
	content: {
		accessToken: string;
		hasTeam: boolean;
		userId: number;
	};
	message: string;
}

export interface UserProfile {
	userId: number;
	username: string;
	profileImageUrl: string | null;
	email: string;
	emailSubscription: boolean;
	commentNotification: string;
	lastSeenTeamspaceId: number;
}

interface ParticipatedTeamspace {
	teamspaceId: number;
	name: string;
	profileImageUrl: string;
	teamspaceRole: string;
	numOfParticipants: number;
	unreadMessageCount: number;
}

export interface UserInformation {
	profile: UserProfile;
	participatedTeamspaces: ParticipatedTeamspace[];
}

export interface Tag {
	id: number;
	name: string;
}

export interface TeamSpaceUser {
	id: number;
	profileImageUrl: string;
	username: string;
	email: string;
	role: 'LEADER' | 'MEMBER';
	tag: Tag | null;
}

export interface TeamSpaceUserList {
	users: TeamSpaceUser[];
}

export interface MySettingResult {
	username: string;
	profileImageUrl: string | null;
	emailSubscription: boolean;
	commentNotification: string;
}
