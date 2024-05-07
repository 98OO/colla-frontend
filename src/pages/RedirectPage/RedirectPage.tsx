import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOauthLoginMutation from '@hooks/queries/useOauthLoginMutation';

const RedirectPage = () => {
	const { mutatePostOauthLogin } = useOauthLoginMutation();
	const { provider } = useParams() as { provider: string };

	useEffect(() => {
		const code = new URL(window.location.href).searchParams.get('code');
		if (code) {
			mutatePostOauthLogin({ code, provider });
		}
	}, [mutatePostOauthLogin, provider]);

	return <div>로딩 중</div>;
};

export default RedirectPage;
