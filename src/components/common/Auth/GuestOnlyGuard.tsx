import { Navigate, Outlet } from 'react-router-dom';
import UnavailableError from '@components/common/Auth/UnavailableError';
import useAuthStore from '@stores/authStore';
import { PATH } from '@constants/path';

const GuestOnlyGuard = () => {
	const status = useAuthStore((state) => state.status);

	switch (status) {
		case 'bootstrapping':
			return null;
		case 'guest':
			return <Outlet />;
		case 'unavailable':
			return <UnavailableError />;
		case 'authenticated':
			return <Navigate to={PATH.FEED} replace />;
		default: {
			const unhandledStatus: never = status;
			throw new Error(`처리되지 않은 인증 상태입니다: ${unhandledStatus}`);
		}
	}
};

export default GuestOnlyGuard;
