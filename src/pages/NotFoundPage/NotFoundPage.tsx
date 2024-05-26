import { useNavigate } from 'react-router-dom';
import Error from '@components/common/Error/Error';
import { HTTP_STATUS_CODE } from '@constants/api';
import { PATH } from '@constants/path';

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<Error
			errorCode={HTTP_STATUS_CODE.NOT_FOUND}
			resetError={() => navigate(PATH.ROOT)}
		/>
	);
};

export default NotFoundPage;
