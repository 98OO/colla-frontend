import { useState, useEffect, useRef, ChangeEvent } from 'react';
import Avatar from '@components/common/Avatar/Avatar';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import Text from '@components/common/Text/Text';
import Toggle from '@components/common/Toggle/Toggle';
import MySettingItem from '@components/Mypage/MySettingItem';
import useFileUpload from '@hooks/common/useFileUpload';
import useDeleteUserProfileMutation from '@hooks/queries/mypage/useDeleteUserProfileMutation';
import useUserSettingMutation from '@hooks/queries/mypage/useUserSettingMutation';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { MySettingResult, UserProfile } from '@type/user';
import useToastStore from '@stores/toastStore';
import * as S from './MyPage.styled';

const MyPage = () => {
	const [userInfo, setUserInfo] = useState<MySettingResult>({
		username: '',
		profileImageUrl: '',
		emailSubscription: false,
		commentNotification: '',
	});
	const [error, setError] = useState('');
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { userStatus } = useUserStatusQuery();
	const { mutateUserSetting } = useUserSettingMutation();
	const { mutateDeleteUserProfile } = useDeleteUserProfileMutation();
	const { makeToast } = useToastStore();
	const { uploadFiles, isFileSizeExceedLimit } = useFileUpload();

	useEffect(() => {
		if (userStatus) {
			setUserInfo({
				username: userStatus.profile.username,
				profileImageUrl: userStatus.profile.profileImageUrl,
				emailSubscription: userStatus.profile.emailSubscription,
				commentNotification: userStatus.profile.commentNotification,
			});
		}
	}, [userStatus]);

	const handleUploadClick = () => {
		inputRef.current?.click();
	};

	const handleCancleClick = () => {
		setUserInfo({
			username: userStatus!.profile.username,
			profileImageUrl: userStatus!.profile.profileImageUrl,
			emailSubscription: userStatus!.profile.emailSubscription,
			commentNotification: userStatus!.profile.commentNotification,
		});
	};

	const handleDeleteClick = () => {
		setUserInfo({
			...userInfo,
			profileImageUrl: null,
		});
	};

	const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setUserInfo({
			...userInfo,
			username: value,
		});
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			if (isFileSizeExceedLimit(event.target.files[0])) {
				makeToast('이미지 크기는 최대 100MB입니다.', 'Warning');
				return;
			}
			setUserInfo({
				...userInfo,
				profileImageUrl: URL.createObjectURL(event.target.files[0]),
			});
		}
	};

	const checkUserName = () => {
		if (userInfo.username.length === 0)
			setError('사용자 이름은 공백일 수 없습니다.');
		else if (userInfo.username.length < 3)
			setError('사용자 이름은 3글자 이상입니다.');
		else {
			setError('');
			return true;
		}

		return false;
	};

	const checkUserSetting = () => {
		const userResult: Partial<UserProfile> = {};

		if (userInfo.profileImageUrl !== userStatus?.profile.profileImageUrl)
			userResult.profileImageUrl = userInfo.profileImageUrl!;
		if (userInfo.username !== userStatus?.profile.username)
			userResult.username = userInfo.username;
		if (userInfo.emailSubscription !== userStatus?.profile.emailSubscription)
			userResult.emailSubscription = userInfo.emailSubscription;
		if (
			userInfo.commentNotification !== userStatus?.profile.commentNotification
		)
			userResult.commentNotification = userInfo.commentNotification;

		return userResult;
	};

	const handlSaveClick = async () => {
		if (!checkUserName()) return;
		const result = checkUserSetting();
		const files = inputRef.current?.files;

		if (Object.keys(result).length !== 0) {
			if (!userInfo.profileImageUrl && userStatus?.profile.profileImageUrl)
				await mutateDeleteUserProfile();
			else if (
				files &&
				userInfo.profileImageUrl !== userStatus?.profile.profileImageUrl
			) {
				const url = await uploadFiles(files, 'USER');
				if (url) [result.profileImageUrl] = url;
			}
			mutateUserSetting(result);
		}
	};

	return (
		<S.Container>
			{userStatus && userInfo && (
				<S.MyPageContainer>
					<Heading size='xs'>마이페이지</Heading>
					<Flex direction='column' gap='10' paddingTop='10' paddingBottom='10'>
						<Flex direction='column' gap='4'>
							<Flex
								paddingTop='8'
								paddingBottom='4'
								paddingLeft='4'
								paddingRight='12'>
								<Text size='md' weight='semiBold' color='secondary'>
									일반
								</Text>
							</Flex>
							<Divider size='sm' />
						</Flex>
						<Flex
							gap='12'
							paddingTop='6'
							paddingBottom='6'
							paddingLeft='12'
							paddingRight='12'>
							<Flex direction='column'>
								<Avatar
									profile={userInfo.profileImageUrl}
									initial={userStatus.profile.username}
									size='xl'
									shape='circle'
								/>
								<Button
									label='이미지 제거'
									variant='text'
									size='sm'
									onClick={handleDeleteClick}
								/>
							</Flex>
							<Flex direction='column' gap='15' paddingTop='4'>
								<Flex direction='column'>
									<Text size='sm' weight='regular' color='tertiary'>
										프로필 이미지 해상도는 최소
									</Text>
									<Text size='sm' weight='regular' color='tertiary'>
										512x512를 추천해요.
									</Text>
								</Flex>
								<Flex>
									<Button
										label='이미지 업로드'
										variant='secondary'
										size='sm'
										onClick={handleUploadClick}
									/>
								</Flex>
								<S.ImgUploadWrapper
									type='file'
									accept='image/*'
									onChange={handleImageChange}
									ref={inputRef}
								/>
							</Flex>
							<Flex
								direction='column'
								gap='16'
								paddingLeft='36'
								paddingRight='16'
								paddingTop='4'
								paddingBottom='4'>
								<Text size='md' weight='semiBold'>
									{userStatus.profile.email}
								</Text>
								<Flex width='240' direction='column' gap='6'>
									<Input
										size='md'
										isError={false}
										value={userInfo.username}
										onChange={(e) => handleUserNameChange(e)}
									/>
									{error && (
										<Flex paddingLeft='4'>
											<Text size='md' weight='medium' color='danger'>
												{error}
											</Text>
										</Flex>
									)}
								</Flex>
							</Flex>
						</Flex>
						{/* <Flex direction='column' gap='4'>
							<Flex paddingTop='8' paddingBottom='4' paddingLeft='4'>
								<Text size='md' weight='semiBold' color='secondary'>
									설정 관리
								</Text>
							</Flex>
							<Divider size='sm' />
						</Flex>
						<Flex direction='column' paddingBottom='12'>
							<MySettingItem
								title='내 팀스페이스의 활동을 이메일로 전송'
								text='댓글, 맨션, 팀스페이스 초대, 일정이 있을 때 이메일을 받습니다.'>
								<Toggle
									state={userInfo.emailSubscription}
									onToggle={(value) =>
										setUserInfo({
											...userInfo,
											emailSubscription: value,
										})
									}
								/>
							</MySettingItem>
							<MySettingItem
								title='게시물 댓글 알림 범위'
								text='자신이 작성한 게시물의 댓글 알림 범위를 설정합니다.'>
								<Flex grow='1'>
									<Select
										size='sm'
										options={['모든 댓글', '나를 맨션']}
										select={
											userInfo.commentNotification === 'ALL'
												? '모든 댓글'
												: '나를 맨션'
										}
										setSelect={(value) =>
											setUserInfo({
												...userInfo,
												commentNotification: value === 1 ? 'ALL' : 'MENTION',
											})
										}
									/>
								</Flex>
							</MySettingItem>
							<MySettingItem
								title='회원 탈퇴'
								text='탈퇴 시 개인 정보 및 팀 스페이스 참가 내역이 삭제되며 복구되지 않습니다.'>
								<Flex width='64'>
									<Button
										label='탈퇴 하기'
										variant='destructive'
										size='sm'
										isFull
									/>
								</Flex>
							</MySettingItem>
						</Flex> */}
						<Flex justify='flex-end' gap='12'>
							<Flex width='64'>
								<Button
									label='취소'
									variant='secondary'
									size='sm'
									isFull
									onClick={handleCancleClick}
								/>
							</Flex>
							<Flex width='64'>
								<Button
									label='저장'
									variant='primary'
									size='sm'
									isFull
									onClick={handlSaveClick}
								/>
							</Flex>
						</Flex>
					</Flex>
				</S.MyPageContainer>
			)}
		</S.Container>
	);
};

export default MyPage;
