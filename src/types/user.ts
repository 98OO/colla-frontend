export interface AccessToken {
	accessToken: string;
}

interface UserProfile {
	userId: number;
	username: string;
	profileImageUrl: string;
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
