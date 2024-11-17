import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Calendar from '@components/Post/Calendar/Calendar';
import * as S from './SchedulingPost.styled';

const SchedulingPost = () => {
	return (
		<S.SchedulingPostContainer>
			<Calendar />
			<Flex justify='flex-end'>
				<Button label='다음' variant='primary' size='md' onClick={() => {}} />
			</Flex>
		</S.SchedulingPostContainer>
	);
};

export default SchedulingPost;
