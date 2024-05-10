import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import getTeamSpaceInformation from '@apis/teamspace/getTeamSpaceInformation';
import postParticipateTeamSpace from '@apis/teamspace/postParticipateTeamSpace';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Input from '@components/common/Input/Input';
import Text from '@components/common/Text/Text';
import useCreateTeamSpaceMutation from '@hooks/queries/useCreateTeamSpaceMutation';
import { AxiosError } from 'axios';
import { HTTPError } from '@apis/HTTPError';
import { PATH } from '@constants/path';
import { teamCreation, teamParticipation } from '@assets/png';
import * as S from './EntryPage.styled';

const EntryPage = () => {
	const [entryData, setEntryData] = useState({
		teamName: '',
		teamCode: '',
	});
	const [errorText, setErrorText] = useState('');
	const navigate = useNavigate();
	const { mutatePostCreateTeamSpace } = useCreateTeamSpaceMutation();

	const handleChange = (
		e: ChangeEvent<HTMLInputElement>,
		fieldName: string
	) => {
		const { value } = e.target;
		setEntryData({
			...entryData,
			[fieldName]: value,
		});
	};

	const handleCreateTeamSpace = () => {
		mutatePostCreateTeamSpace(entryData.teamName);
	};

	const handleParticipateTeamSpace = async () => {
		try {
			const response = await getTeamSpaceInformation(entryData.teamCode);
			if (!response.isParticipated) {
				await postParticipateTeamSpace(
					response.teamspaceId,
					entryData.teamCode
				);
			}
			navigate(PATH.FEED);
		} catch (error) {
			const httpError = error as AxiosError<HTTPError>;
			setErrorText(httpError.message);
		}
	};

	return (
		<Flex direction='column' gap='8' align='center' width='740' padding='10'>
			<Heading size='lg'>팀스페이스 생성 또는 참가</Heading>
			<Text size='lg' weight='regular' color='secondary'>
				팀스페이스를 직접 만들거나 참가하세요
			</Text>
			<Flex
				direction='row'
				gap='24'
				paddingTop='20'
				paddingBottom='20'
				width='720'>
				<S.EntryOptionContainer>
					<Flex direction='column' gap='4'>
						<Heading size='lg'>생성</Heading>
						<Text size='md' weight='medium' color='secondary'>
							팀스페이스를 만들고 협업을 시작하세요
						</Text>
					</Flex>
					<S.ImageWrapper>
						<img alt='teamCreation' src={teamCreation} />
					</S.ImageWrapper>
					<S.InputWrapper>
						<Text size='md' weight='medium'>
							팀스페이스 이름
						</Text>
						<Input
							size='lg'
							placeholder='팀스페이스 이름 입력'
							isError={false}
							value={entryData.teamName}
							maxLength={20}
							onChange={(e) => handleChange(e, 'teamName')}
						/>
					</S.InputWrapper>
					<Flex direction='column'>
						<Flex height='28' align='center' />
						<Button
							label='생성하기'
							variant='primary'
							size='lg'
							disabled={entryData.teamName.length < 2}
							onClick={handleCreateTeamSpace}
						/>
					</Flex>
				</S.EntryOptionContainer>
				<S.EntryOptionContainer>
					<Flex direction='column' gap='4'>
						<Heading size='lg'>참가</Heading>
						<Text size='md' weight='medium' color='secondary'>
							초대링크를 입력하여 팀스페이스에 참가하세요
						</Text>
					</Flex>
					<S.ImageWrapper>
						<img alt='teamParticipation' src={teamParticipation} />
					</S.ImageWrapper>
					<S.InputWrapper>
						<Text size='md' weight='medium'>
							초대링크
						</Text>
						<Input
							size='lg'
							placeholder='초대링크 입력'
							isError={false}
							value={entryData.teamCode}
							onChange={(e) => handleChange(e, 'teamCode')}
						/>
					</S.InputWrapper>
					<Flex direction='column'>
						<Flex height='28' align='center'>
							<Text size='md' weight='regular' color='danger'>
								{errorText}
							</Text>
						</Flex>
						<Button
							label='참가하기'
							variant='primary'
							size='lg'
							disabled={entryData.teamCode.length === 0}
							onClick={handleParticipateTeamSpace}
						/>
					</Flex>
				</S.EntryOptionContainer>
			</Flex>
		</Flex>
	);
};

export default EntryPage;
