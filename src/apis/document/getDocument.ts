import { storageResponse } from '@type/document';
import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const getDocument = async (teamspaceId: number): Promise<storageResponse> => {
	const response = await axiosInstance.get(
		`${END_POINTS.TEAMSPACE}/${teamspaceId}/attachments`
	);

	return response.data.content;
};

export default getDocument;
