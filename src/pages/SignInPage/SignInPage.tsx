import { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import getTeamSpaceInformation from '@apis/teamspace/getTeamSpaceInformation';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import Input from '@components/common/Input/Input';
import { OauthButton } from '@components/common/OauthButton/OauthButton';
import Profile from '@components/common/Profile/Profile';
import Text from '@components/common/Text/Text';
import useLoginMutation from '@hooks/queries/useLoginMutation';
import useToastStore from '@stores/toastStore';
import { INVITE_URL } from '@constants/api';
import { PATH } from '@constants/path';
import { KakaoLogin, NaverLogin, GoogleLogin, Colla } from '@assets/svg';
import * as S from './SignInPage.styled';

interface TeamSpaceInfo {
	teamspaceProfileImageUrl: string | null;
	teamspaceName: string;
}

const SignInPage = () => {
	const [teamSpaceInfo, setTeamspaceInfo] = useState<TeamSpaceInfo | null>(
		null
	);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errorText, setErrorText] = useState('');
	const navigate = useNavigate();
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const { mutatePostLogin } = useLoginMutation();
	const { makeToast } = useToastStore();

	const handleInviteCode = async () => {
		const inviteUrl = window.sessionStorage.getItem(INVITE_URL);
		if (inviteUrl === null) return;

		const code = new URLSearchParams(inviteUrl).get('code');
		if (code === null) return;

		try {
			const response = await getTeamSpaceInformation(code, {
				authRequired: false,
			});
			setTeamspaceInfo({
				teamspaceProfileImageUrl: response.teamspaceProfileImageUrl,
				teamspaceName: response.teamspaceName,
			});
		} catch (error) {
			window.sessionStorage.removeItem(INVITE_URL);
			setTeamspaceInfo(null);
			makeToast('유효하지 않은 초대입니다.', 'Warning');
			throw error;
		}
	};

	useEffect(() => {
		handleInviteCode();
	}, []);

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
			{teamSpaceInfo && (
				<S.InvitedTeamspaceInfo>
					<Flex gap='xs' align='center'>
						<Profile
							profile={teamSpaceInfo.teamspaceProfileImageUrl}
							initial={teamSpaceInfo.teamspaceName}
							avatarSize='mlg'
							avatarShape='rect'
							title={teamSpaceInfo.teamspaceName}
							titleSize='lg'
							titleWeight='semiBold'
							text='팀원으로 참여하려면 로그인하세요.'
						/>
						<IconButton
							icon='X'
							ariaLabel='닫기'
							size='sm'
							onClick={() => {
								window.sessionStorage.removeItem(INVITE_URL);
								setTeamspaceInfo(null);
							}}
						/>
					</Flex>
				</S.InvitedTeamspaceInfo>
			)}
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
				<OauthButton type='GOOGLE'>
					<GoogleLogin />
				</OauthButton>
			</S.OauthWrapper>
		</S.Container>
	);
};

export default SignInPage;
