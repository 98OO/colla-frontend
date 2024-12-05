import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

export interface CollectSubTaskParams {
	teamspaceId: number | undefined;
	feedId: number;
	title: string | null;
	content: string | null;
}

const patchCollectSubTask = async ({
	teamspaceId,
	feedId,
	title,
	content,
}: CollectSubTaskParams) => {
	const response = await axiosInstance.patch(
		`${END_POINTS.PATCH_COLLECT_SUB_TASK(teamspaceId!, feedId)}`,
		{
			title,
			content,
		}
	);

	return response.data;
};

export default patchCollectSubTask;
