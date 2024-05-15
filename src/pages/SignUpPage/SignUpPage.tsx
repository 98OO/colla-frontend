import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postAuthMail from '@apis/user/postAuthMail';
import postMailVerification from '@apis/user/postMailVerification';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Input from '@components/common/Input/Input';
import Text from '@components/common/Text/Text';
import useRegisterMutation from '@hooks/queries/useRegisterMutation';
import useForm from '@hooks/user/useForm';
import { PATH } from '@constants/path';
import { Colla } from '@assets/svg';
import * as S from './SignUpPage.styled';

const SignUpPage = () => {
	const [requested, setRequested] = useState(false);
	const [verified, setVerified] = useState(false);
	const { mutatePostRegister } = useRegisterMutation();
	const navigate = useNavigate();
	const { formData, submitting, errors, register, handleSubmit } = useForm({
		subscribe: [{ fieldName: 'verifyCode', value: verified }],
		onSubmit: async () => {
			await mutatePostRegister({
				username: formData.username,
				password: formData.password,
				email: formData.email,
				verifyCode: formData.verifyCode,
			});
		},
	});

	const handleRequest = () => {
		postAuthMail(formData.email);
		setRequested(true);
		alert('인증 메일을 보냈습니다.');
	};

	const handleVerification = async () => {
		try {
			await postMailVerification(formData.email, formData.verifyCode);
			setVerified(true);
			alert('이메일 인증에 성공했습니다.');
		} catch (error) {
			setVerified(false);
		}
	};

	const validationRules = {
		username: {
			required: '닉네임을 입력해주세요.',
			length: {
				min: 3,
				max: 16,
				message: '3자 이상 16자 이하의 닉네임을 입력해주세요.',
			},
			pattern: {
				regExp: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{3,16}$/i,
				message: '닉네임은 한글 또는 영문입니다.',
			},
		},
		email: {
			required: '이메일을 입력해주세요.',
			pattern: {
				regExp: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
				message: '유효한 이메일을 입력해주세요.',
			},
		},
		verifyCode: {
			required: '인증번호를 입력해주세요.',
			validate: {
				validateFn: () => verified === true,
				message: '인증번호가 일치하지 않거나 인증시간을 초과했습니다.',
			},
		},
		password: {
			required: '비밀번호를 입력해주세요.',
			length: {
				min: 8,
				message: '비밀번호는 8자 이상이어야 합니다.',
			},
			pattern: {
				regExp: /^(?=.*[A-Za-z])(?=.*\d).*$/,
				message: '비밀번호는 영문자와 숫자를 포함해야 합니다.',
			},
		},
		confirmPassword: {
			required: '비밀번호를 다시 한 번 입력해주세요.',
			validate: {
				validateFn: (value: string) => value === formData.password,
				message: '비밀번호가 일치하지 않습니다.',
			},
		},
	};

	return (
		<S.Container>
			<Colla />
			<S.FormContainer onSubmit={handleSubmit}>
				<Flex direction='column' gap='12'>
					<Input
						size='lg'
						placeholder='닉네임'
						maxLength={20}
						isError={errors?.username?.isError}
						{...register('username', validationRules.username)}
					/>
					{errors.username?.isError && (
						<Text size='sm' weight='regular' color='danger'>
							{errors.username.message}
						</Text>
					)}
				</Flex>
				<Flex direction='column' gap='12'>
					<Flex gap='8'>
						<Input
							size='lg'
							placeholder='이메일'
							maxLength={20}
							isError={errors?.email?.isError}
							{...register('email', validationRules.email)}
						/>
						<Button
							label='인증'
							size='lg'
							variant='primary'
							disabled={errors?.email?.isError ?? true}
							onClick={handleRequest}
						/>
					</Flex>
					<Flex gap='8'>
						<Input
							size='lg'
							placeholder='인증번호 입력'
							maxLength={20}
							isError={errors?.verifyCode?.isError}
							{...register('verifyCode', validationRules.verifyCode, false)}
						/>
						<Button
							label='확인'
							size='lg'
							variant='primary'
							disabled={errors?.email?.isError || !requested}
							onClick={handleVerification}
						/>
					</Flex>
					<Flex direction='column' gap='6'>
						{errors.email?.isError && (
							<Text size='sm' weight='regular' color='danger'>
								{errors.email.message}
							</Text>
						)}
						{errors.verifyCode?.isError && (
							<Text size='sm' weight='regular' color='danger'>
								{errors.verifyCode.message}
							</Text>
						)}
					</Flex>
				</Flex>
				<Flex direction='column' gap='12'>
					<Input
						type='password'
						size='lg'
						placeholder='비밀번호'
						maxLength={20}
						isError={errors?.password?.isError}
						{...register('password', validationRules.password)}
					/>
					<Input
						type='password'
						size='lg'
						placeholder='비밀번호 확인'
						isError={errors?.confirmPassword?.isError}
						maxLength={20}
						{...register('confirmPassword', validationRules.confirmPassword)}
					/>
					<Flex direction='column' gap='6'>
						{errors.password?.isError && (
							<Text size='sm' weight='regular' color='danger'>
								{errors.password.message}
							</Text>
						)}
						{errors.confirmPassword?.isError && (
							<Text size='sm' weight='regular' color='danger'>
								{errors.confirmPassword.message}
							</Text>
						)}
					</Flex>
				</Flex>
				<Button
					type='submit'
					label='가입하기'
					size='lg'
					variant='primary'
					isFull
					disabled={submitting}
				/>
			</S.FormContainer>
			<Flex align='center'>
				<Text size='md' weight='regular'>
					계정이 있나요?
				</Text>
				<Button
					label='로그인하기'
					variant='text'
					size='md'
					onClick={() => navigate(PATH.SIGNIN)}
				/>
			</Flex>
		</S.Container>
	);
};

export default SignUpPage;
