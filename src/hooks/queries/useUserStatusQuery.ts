import getUserStatus from '@apis/user/getUserStatus';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@stores/authStore';
import type { UserInformation } from '@type/user';

const useUserStatusQuery = () => {
	const authStatus = useAuthStore((state) => state.status);

	const { data: userStatus } = useQuery<UserInformation>({
		queryKey: ['userStatus'],
		queryFn: getUserStatus,
		// 로그인 상태에서만 요청 — 로그아웃(guest)·복구 중(loading)엔 토큰 없는 요청을 막는다
		enabled: authStatus === 'authenticated',
		gcTime: 60 * 60 * 60 * 1000,
		staleTime: 60 * 60 * 60 * 1000,
	});

	return { userStatus };
};

export default useUserStatusQuery;
