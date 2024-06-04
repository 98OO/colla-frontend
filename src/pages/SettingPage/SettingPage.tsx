import { useRef, useState, ChangeEvent, useEffect } from 'react';
import Avatar from '@components/common/Avatar/Avatar';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Input from '@components/common/Input/Input';
import Text from '@components/common/Text/Text';
import TeamMemberItem from '@components/Setting/TeamMemberItem';
import useFileUpload from '@hooks/common/useFileUpload';
import useDeleteTeamProfileMutation from '@hooks/queries/setting/useDeleteTeamProfileMutation';
import useSettingMutation from '@hooks/queries/setting/useSettingMutation';
import useTeamSettingQuery from '@hooks/queries/setting/useTeamSettingQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { TeamState, TeamSettingResult } from '@type/team';
import useToastStore from '@stores/toastStore';
import * as S from './SettingPage.styled';

const SettingPage = () => {
	const [teamInfo, setTeamInfo] = useState<TeamState>({
		profileImageUrl: '',
		name: '',
		users: [],
	});
	const [error, setError] = useState('');
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { makeToast } = useToastStore();
	const { userStatus } = useUserStatusQuery();
	const { teamSetting } = useTeamSettingQuery(
		userStatus?.profile.lastSeenTeamspaceId
	);
	const { mutateSetting } = useSettingMutation();
	const { uploadFiles, isFileSizeExceedLimit } = useFileUpload();
	const { mutateDeleteTeamProfile } = useDeleteTeamProfileMutation();

	useEffect(() => {
		if (teamSetting) {
			setTeamInfo({
				profileImageUrl: teamSetting.profileImageUrl,
				name: teamSetting.name,
				users: teamSetting.users.map((user) => ({
					id: user.id,
					tagId: user.tag ? user.tag.id : null,
				})),
			});
		}
	}, [teamSetting]);

	const handleUploadClick = () => {
		inputRef.current?.click();
	};

	const handleCancleClick = () => {
		setTeamInfo({
			profileImageUrl: teamSetting!.profileImageUrl,
			name: teamSetting!.name,
			users: teamSetting!.users.map((user) => ({
				id: user.id,
				tagId: user.tag ? user.tag.id : null,
			})),
		});
		setError('');
	};

	const handleDeleteClick = () => {
		setTeamInfo({
			...teamInfo,
			profileImageUrl: null,
		});
	};

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setTeamInfo({
			...teamInfo,
			name: value,
		});
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			if (isFileSizeExceedLimit(event.target.files[0])) {
				makeToast('이미지 크기는 최대 100MB입니다.', 'Warning');
				return;
			}
			setTeamInfo({
				...teamInfo,
				profileImageUrl: URL.createObjectURL(event.target.files[0]),
			});
		}
	};

	const checkTeamName = () => {
		if (teamInfo.name.length === 0)
			setError('팀스페이스 이름은 공백일 수 없습니다.');
		else if (teamInfo.name.length < 2)
			setError('팀스페이스 이름은 2글자 이상입니다.');
		else {
			setError('');
			return true;
		}
		return false;
	};

	const checkTeamSetting = () => {
		const settingResult: TeamSettingResult = {};
		if (teamInfo.profileImageUrl !== teamSetting?.profileImageUrl)
			settingResult.profileImageUrl = teamInfo.profileImageUrl!;

		if (teamInfo.name !== teamSetting?.name) settingResult.name = teamInfo.name;

		teamInfo.users.forEach((teamUser, index) => {
			if (teamSetting?.users[index]?.tag === null) {
				if (teamUser.tagId !== null) {
					settingResult.users = settingResult.users || [];
					settingResult.users.push({
						id: teamUser.id,
						tagId: teamUser.tagId,
					});
				}
			}

			if (teamSetting?.users[index]?.tag !== null) {
				if (teamSetting?.users[index].tag?.id !== teamUser.tagId) {
					settingResult.users = settingResult.users || [];
					settingResult.users?.push({
						id: teamUser.id,
						tagId: teamUser.tagId,
					});
				}
			}
		});
		return settingResult;
	};

	const handlSaveClick = async () => {
		if (!checkTeamName()) return;
		const result = checkTeamSetting();
		const files = inputRef.current?.files;

		if (Object.keys(result).length !== 0) {
			if (!teamInfo.profileImageUrl && teamSetting?.profileImageUrl)
				await mutateDeleteTeamProfile(userStatus!.profile.lastSeenTeamspaceId);
			else if (
				files &&
				teamInfo.profileImageUrl !== teamSetting?.profileImageUrl
			) {
				const url = await uploadFiles(
					files,
					'TEAMSPACE',
					userStatus?.profile.lastSeenTeamspaceId
				);
				if (url) [result.profileImageUrl] = url;
			}
			mutateSetting(userStatus!.profile.lastSeenTeamspaceId, result);
		}
	};

	return (
		<S.Container>
			{teamSetting && teamInfo && (
				<S.SettingContainer>
					<Heading size='xs'>팀스페이스 설정</Heading>
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
									profile={teamInfo.profileImageUrl}
									initial={teamSetting.name}
									size='xl'
									shape='rect'
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
										팀스페이스 이미지 해상도는 최소
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
								paddingBottom='4'
								grow='1'>
								<Text size='md' weight='semiBold'>
									팀스페이스 이름
								</Text>
								<Flex width='240' direction='column' gap='6'>
									<Input
										size='md'
										isError={false}
										value={teamInfo.name}
										onChange={(e) => handleNameChange(e)}
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
						<Flex direction='column' gap='4'>
							<Flex justify='space-between' gap='4'>
								<Flex paddingTop='8' paddingBottom='4' paddingLeft='4' grow='1'>
									<Text size='md' weight='semiBold' color='secondary'>
										{`팀원 관리 (${teamSetting.users.length}/10)`}
									</Text>
								</Flex>
								<Button
									label='역할 추가히기'
									variant='secondary'
									size='sm'
									leadingIcon='Plus'
								/>
							</Flex>
							<Divider size='sm' />
						</Flex>
						<Flex direction='column'>
							<S.TeamMemeberHeader>
								<Flex width='400' paddingRight='8' paddingLeft='8'>
									<Text size='lg' weight='medium'>
										사용자
									</Text>
								</Flex>
								<Flex grow='1' paddingRight='8' paddingLeft='8'>
									<Text size='lg' weight='medium'>
										권한
									</Text>
								</Flex>
								<Flex grow='1' paddingRight='8' paddingLeft='8'>
									<Text size='lg' weight='medium'>
										역할
									</Text>
								</Flex>
							</S.TeamMemeberHeader>
							<S.TeamMemberContainer>
								{teamSetting.users.map((user, index) => (
									<TeamMemberItem
										profile={user.profileImageUrl}
										username={user.username}
										email={user.email}
										role={user.role}
										tag={
											teamInfo.users[index]?.tagId === null
												? null
												: teamSetting.tags.find(
														(tag) => tag.id === teamInfo.users[index]?.tagId
													)?.name || null
										}
										tagOption={
											teamSetting.tags.length > 0
												? teamSetting.tags.map((tag) => tag.name)
												: null
										}
										tagSelect={(value) =>
											setTeamInfo({
												...teamInfo,
												users: teamInfo.users.map((info) => ({
													id: info.id,
													tagId:
														info.id === user.id
															? teamSetting.tags[value - 1].id
															: info.tagId,
													// value-1로 해서 배열에서 찾도록
												})),
											})
										}
									/>
								))}
							</S.TeamMemberContainer>
						</Flex>
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
				</S.SettingContainer>
			)}
		</S.Container>
	);
};

export default SettingPage;
