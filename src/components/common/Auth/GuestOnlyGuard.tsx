import { Navigate, Outlet } from 'react-router-dom';
import UnavailableError from '@components/common/Auth/UnavailableError';
import resolveServiceEntryPath from '@utils/auth/resolveServiceEntryPath';
import useAuthStore from '@stores/authStore';

const GuestOnlyGuard = () => {
	const status = useAuthStore((state) => state.status);
	const hasTeam = useAuthStore((state) => state.hasTeam);

	switch (status) {
		case 'bootstrapping':
			return null;
		case 'guest':
			return <Outlet />;
		case 'unavailable':
			return <UnavailableError />;
		case 'authenticated': {
			if (hasTeam === null) throw new Error('팀 참여 정보가 없습니다.');

			return <Navigate to={resolveServiceEntryPath(hasTeam)} replace />;
		}
		default: {
			const unhandledStatus: never = status;
			throw new Error(`처리되지 않은 인증 상태입니다: ${unhandledStatus}`);
		}
	}
};

export default GuestOnlyGuard;
