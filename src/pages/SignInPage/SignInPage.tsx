import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/common/Button/Button';
import Input from '@components/common/Input/Input';
import { OauthButton } from '@components/common/OauthButton/OauthButton';
import Text from '@components/common/Text/Text';
import { PATH } from '@constants/path';
import { KakaoLogin, GoogleLogin, NaverLogin, Colla } from '@assets/svg';
import * as S from './SignInPage.styled';

const SignInPage = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const navigate = useNavigate();

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

	return (
		<S.Container>
			<S.ImageWrapper>
				<Colla />
			</S.ImageWrapper>
			<S.FormContainer>
				<S.InputWrapper>
					<Input
						size='md'
						placeholder='이메일'
						isError={false}
						value={formData.email}
						onChange={(e) => handleChange(e, 'email')}
					/>
					<Input
						size='md'
						placeholder='비밀번호'
						isError={false}
						type='password'
						value={formData.password}
						onChange={(e) => handleChange(e, 'password')}
					/>
				</S.InputWrapper>
				<S.ButtonContainer>
					<Button
						label='로그인'
						variant='primary'
						size='md'
						isFull
						onClick={() => {}}
					/>
					<S.TextWrapper>
						<Text size='sm' weight='regular'>
							계정이 없나요?
						</Text>
						<Button
							label='가입하기'
							variant='text'
							size='sm'
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
				<OauthButton type='GOOGLE'>
					<GoogleLogin />
				</OauthButton>
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
