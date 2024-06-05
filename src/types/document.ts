interface Attachment {
	id: number;
	name: string;
	type: string;
	size: number;
	attachType: string;
	fileUrl: string;
	createdAt: string;
	author: {
		id: number;
		username: string;
		profileImageUrl: string | null;
	};
}

export interface storageResponse {
	totalStorageCapacity: number;
	attachments: Attachment[];
}
