import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Text from '@components/common/Text/Text';
import EntryItem from '@components/Entry/EntryItem/EntryItem';
import { teamCreation, teamParticipation } from '@assets/png';

const EntryPage = () => {
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
				<EntryItem
					type='teamName'
					title='생성'
					subTitle='팀스페이스를 만들고 협업을 시작하세요'
					image={teamCreation}
					inputLabel='팀스페이스 이름'
					buttonLabel='생성하기'
				/>
				<EntryItem
					type='teamCode'
					title='참가'
					subTitle='초대코드를 입력하여 팀스페이스에 참가하세요'
					image={teamParticipation}
					inputLabel='초대코드'
					buttonLabel='참가하기'
				/>
			</Flex>
		</Flex>
	);
};

export default EntryPage;
