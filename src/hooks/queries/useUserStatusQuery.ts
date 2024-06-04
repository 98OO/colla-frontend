import getUserStatus from '@apis/user/getUserStatus';
import { useQuery } from '@tanstack/react-query';
import type { UserInformation } from '@type/user';

const useUserStatusQuery = () => {
	const { data: userStatus } = useQuery<UserInformation>({
		queryKey: ['userStatus'],
		queryFn: getUserStatus,
		gcTime: 60 * 60 * 60 * 1000,
		staleTime: 60 * 60 * 60 * 1000,
	});

	return { userStatus };
};

export default useUserStatusQuery;
