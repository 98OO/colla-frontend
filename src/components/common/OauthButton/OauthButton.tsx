import { PropsWithChildren } from 'react';
import { AUTH_API_URL } from '@constants/api';
import * as S from './OauthButton.styled';

interface OauthButtonProps {
	type: 'KAKAO' | 'GOOGLE' | 'NAVER';
}

export const OauthButton = (props: PropsWithChildren<OauthButtonProps>) => {
	const { type, children } = props;
	const navigateUrl = () => {
		window.location.href = AUTH_API_URL[type];
	};

	return (
		<S.OauthButtonWrapper onClick={() => navigateUrl()}>
			{children}
		</S.OauthButtonWrapper>
	);
};
