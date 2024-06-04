import { TeamSettingResult } from '@type/team';
import { axiosInstance } from '@apis/axiosInstance';
import { END_POINTS } from '@constants/api';

const patchSettingCorrection = async (
	teamspaceId: number,
	teamSetting: TeamSettingResult
) => {
	const response = await axiosInstance.patch(
		`${END_POINTS.TEAMSPACE}/${teamspaceId}/settings`,
		teamSetting
	);

	return response.data;
};

export default patchSettingCorrection;
