import { useState } from 'react';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import type { SchedulingCondition } from '@type/post';
import * as S from '../SchedulingPost.styled';

interface TitleSectionProps {
	isSubmitAttempted: boolean;
	initialTitle: string;
	updateCondition: (patch: Partial<SchedulingCondition>) => void;
}

const TitleSection = ({ isSubmitAttempted, initialTitle, updateCondition }: TitleSectionProps) => {
	const [title, setTitle] = useState(initialTitle);

	const showError = isSubmitAttempted && !title.trim();

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
		updateCondition({ title: event.target.value });
	};

	return (
		<Flex direction='column'>
			<S.PostInput placeholder='제목을 입력해주세요' value={title} onChange={handleTitleChange} />
			{showError && (
				<Flex direction='column' marginTop='8' width='300'>
					<Text size='md' weight='regular' color='danger'>
						제목이 없어요
					</Text>
				</Flex>
			)}
		</Flex>
	);
};

export default TitleSection;
