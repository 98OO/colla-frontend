import { retrySessionRestore } from '@apis/auth/sessionRestore';
import Error from '@components/common/Error/Error';
import useAuthStore from '@stores/authStore';
import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from '@constants/api';
import type { AuthUnavailableReason } from '@type/auth';

const getAuthErrorMessage = (reason: AuthUnavailableReason | null) => {
	switch (reason?.type) {
		case 'network':
			return HTTP_ERROR_MESSAGE.NETWORK;
		case 'server':
			return HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR];
		case 'client':
		default:
			return HTTP_ERROR_MESSAGE.DEFAULT;
	}
};

const UnavailableError = () => {
	const unavailableReason = useAuthStore((state) => state.unavailableReason);

	return (
		<Error errorMessage={getAuthErrorMessage(unavailableReason)} resetError={retrySessionRestore} />
	);
};

export default UnavailableError;
