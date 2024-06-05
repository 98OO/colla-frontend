import { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/common/Button/Button';
import Input from '@components/common/Input/Input';
import { OauthButton } from '@components/common/OauthButton/OauthButton';
import Text from '@components/common/Text/Text';
import useLoginMutation from '@hooks/queries/useLoginMutation';
import { PATH } from '@constants/path';
import { KakaoLogin, NaverLogin, Colla } from '@assets/svg';
import * as S from './SignInPage.styled';

const SignInPage = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errorText, setErrorText] = useState('');
	const navigate = useNavigate();
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const { mutatePostLogin } = useLoginMutation();

	const handleChange = (
		e: ChangeEvent<HTMLInputElement>,
		fieldName: string
	) => {
		const { value } = e.target;
		setFormData({
			...formData,
			[fieldName]: value,
		});
	};

	const checkFormData = () => {
		if (!formData.email) {
			setErrorText('이메일을 입력해 주세요.');
			emailRef.current?.focus();
			return true;
		}

		if (!formData.password) {
			setErrorText('비밀번호를 입력해 주세요.');
			passwordRef.current?.focus();
			return true;
		}
		return false;
	};

	const handleLogin = async (e: MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (checkFormData()) return;
		try {
			await mutatePostLogin(formData);
		} catch (error) {
			setErrorText('이메일 또는 비밀번호가 일치하지 않습니다.');
		}
	};

	return (
		<S.Container>
			<S.ImageWrapper>
				<Colla />
			</S.ImageWrapper>
			<S.FormContainer onSubmit={handleLogin}>
				<S.InputWrapper>
					<Input
						size='lg'
						placeholder='이메일'
						isError={false}
						value={formData.email}
						maxLength={40}
						onChange={(e) => handleChange(e, 'email')}
						ref={emailRef}
					/>
					<Input
						size='lg'
						placeholder='비밀번호'
						isError={false}
						type='password'
						value={formData.password}
						maxLength={20}
						onChange={(e) => handleChange(e, 'password')}
						ref={passwordRef}
					/>
				</S.InputWrapper>
				<S.ButtonContainer>
					<S.WarningTextWrapper>
						<Text size='md' weight='regular' color='danger'>
							{errorText}
						</Text>
					</S.WarningTextWrapper>
					<Button
						type='submit'
						label='로그인'
						variant='primary'
						size='lg'
						isFull
					/>
					<S.TextWrapper>
						<Text size='md' weight='regular'>
							계정이 없나요?
						</Text>
						<Button
							label='가입하기'
							variant='text'
							size='md'
							isFull={false}
							onClick={() => {
								navigate(PATH.SIGNUP);
							}}
						/>
					</S.TextWrapper>
				</S.ButtonContainer>
			</S.FormContainer>
			<S.DividerContainer>
				<S.Divider />
				<Text size='md' weight='medium' color='tertiary'>
					또는
				</Text>
				<S.Divider />
			</S.DividerContainer>
			<S.OauthWrapper>
				<OauthButton type='KAKAO'>
					<KakaoLogin />
				</OauthButton>
				<OauthButton type='NAVER'>
					<NaverLogin />
				</OauthButton>
			</S.OauthWrapper>
		</S.Container>
	);
};

export default SignInPage;
