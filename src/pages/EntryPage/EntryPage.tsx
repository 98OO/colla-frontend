import { useState, ChangeEvent } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Input from '@components/common/Input/Input';
import Text from '@components/common/Text/Text';
import { teamCreation, teamParticipation } from '@assets/png';
import * as S from './EntryPage.styled';

const EntryPage = () => {
	const [entryData, setEntryData] = useState({
		teamName: '',
		teamLink: '',
	});

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
					<img alt='collaBear' src={teamCreation} />
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
					<Button
						label='생성하기'
						variant='primary'
						size='lg'
						onClick={() => {}}
					/>
				</S.EntryOptionContainer>
				<S.EntryOptionContainer>
					<Flex direction='column' gap='4'>
						<Heading size='lg'>참가</Heading>
						<Text size='md' weight='medium' color='secondary'>
							초대링크를 입력하여 팀스페이스에 참가하세요
						</Text>
					</Flex>
					<img alt='collaBear' src={teamParticipation} />
					<S.InputWrapper>
						<Text size='md' weight='medium'>
							초대링크
						</Text>
						<Input
							size='lg'
							placeholder='초대링크 입력'
							isError={false}
							value={entryData.teamLink}
							onChange={(e) => handleChange(e, 'teamLink')}
						/>
					</S.InputWrapper>
					<Button
						label='참가하기'
						variant='primary'
						size='lg'
						onClick={() => {}}
					/>
				</S.EntryOptionContainer>
			</Flex>
		</Flex>
	);
};

export default EntryPage;
