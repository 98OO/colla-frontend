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
	numOfParticipant: number;
}

export interface UserInformation {
	profile: UserProfile;
	participatedTeamspaces: ParticipatedTeamspace[];
}
