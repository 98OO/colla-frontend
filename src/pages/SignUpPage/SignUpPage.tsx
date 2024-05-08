import { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import postAuthMail from '@apis/user/postAuthMail';
import postMailVerification from '@apis/user/postMailVerification';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Input from '@components/common/Input/Input';
import Text from '@components/common/Text/Text';
import useRegisterMutation from '@hooks/queries/useRegisterMutation';
import { PATH } from '@constants/path';
import { Colla } from '@assets/svg';
import type { ValidationErrors } from './validate';
import * as S from './SignUpPage.styled';
import { validate } from './validate';

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		verifyCode: '',
		verified: false,
		password: '',
		confirmPassword: '',
	});
	const [errors, setErrors] = useState<ValidationErrors>({});
	const { mutatePostRegister } = useRegisterMutation();
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

	const checkFormData = () => {
		const validationErrors = validate(formData);
		setErrors(validationErrors);
	};

	const handleRequest = () => {
		postAuthMail(formData.email);
	};

	const handleVerification = async () => {
		try {
			await postMailVerification(formData.email, formData.verifyCode);
			setFormData({
				...formData,
				verified: true,
			});
		} catch (error) {
			setFormData({
				...formData,
				verified: false,
			});
		}
	};

	const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		checkFormData();
		if (Object.keys(errors).length === 0) {
			try {
				await mutatePostRegister({
					username: formData.username,
					password: formData.password,
					email: formData.email,
					verifyCode: formData.verifyCode,
				});
			} catch (error) {
				alert('회원 가입 실패. 인증된 정보가 없거나 이미 가입된 메일입니다.');
			}
		}
	};

	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			checkFormData();
		}
	}, [formData]);

	return (
		<S.Container>
			<Colla />
			<S.FormContainer onSubmit={handleSubmit}>
				<Flex direction='column' gap='12'>
					<Input
						size='lg'
						placeholder='닉네임'
						maxLength={20}
						isError={!!errors.username}
						value={formData.username}
						onChange={(e) => handleChange(e, 'username')}
					/>
					{errors.username && (
						<Text size='sm' weight='regular' color='danger'>
							{errors.username}
						</Text>
					)}
				</Flex>
				<Flex direction='column' gap='12'>
					<Flex gap='8'>
						<Input
							size='lg'
							placeholder='이메일'
							maxLength={20}
							isError={!!errors.email}
							value={formData.email}
							onChange={(e) => handleChange(e, 'email')}
						/>
						<Button
							label='인증'
							size='lg'
							variant='primary'
							disabled={!!errors.email}
							onClick={handleRequest}
						/>
					</Flex>
					<Flex gap='8'>
						<Input
							size='lg'
							placeholder='인증번호 입력'
							maxLength={20}
							isError={!!errors.verfiyCode}
							value={formData.verifyCode}
							onChange={(e) => handleChange(e, 'verifyCode')}
						/>
						<Button
							label='확인'
							size='lg'
							variant='primary'
							onClick={handleVerification}
						/>
					</Flex>
					{errors.email && (
						<Text size='sm' weight='regular' color='danger'>
							{errors.email}
						</Text>
					)}
					{errors.verfiyCode && (
						<Text size='sm' weight='regular' color='danger'>
							{errors.verfiyCode}
						</Text>
					)}
				</Flex>
				<Flex direction='column' gap='12'>
					<Input
						type='password'
						size='lg'
						placeholder='비밀번호'
						maxLength={20}
						isError={!!errors.password}
						value={formData.password}
						onChange={(e) => handleChange(e, 'password')}
					/>
					<Input
						type='password'
						size='lg'
						placeholder='비밀번호 확인'
						isError={!!errors.confirmPassword}
						value={formData.confirmPassword}
						maxLength={20}
						onChange={(e) => handleChange(e, 'confirmPassword')}
					/>
					{errors.password && (
						<Text size='sm' weight='regular' color='danger'>
							{errors.password}
						</Text>
					)}
					{errors.confirmPassword && (
						<Text size='sm' weight='regular' color='danger'>
							{errors.confirmPassword}
						</Text>
					)}
				</Flex>
				<Button
					type='submit'
					label='가입하기'
					size='lg'
					variant='primary'
					isFull
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
