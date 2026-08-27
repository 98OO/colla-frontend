import { Navigate, Outlet } from 'react-router-dom';
import useCurrentTeamRole from '@hooks/auth/useCurrentTeamRole';
import { HTTPError } from '@apis/HTTPError';
import { HTTP_STATUS_CODE } from '@constants/api';
import { PATH } from '@constants/path';
import type { TeamRole } from '@type/user';

interface RoleGuardProps {
	requiredRole: TeamRole;
}

const RoleGuard = ({ requiredRole }: RoleGuardProps) => {
	const { userStatus, currentTeamRole } = useCurrentTeamRole();

	if (userStatus === undefined) return null;
	if (currentTeamRole === null) return <Navigate to={PATH.ENTRY} replace />;
	if (currentTeamRole !== requiredRole) throw new HTTPError(HTTP_STATUS_CODE.FORBIDDEN);

	return <Outlet />;
};

export default RoleGuard;
