import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import type { Attachment } from '@type/chat';
import * as S from './MyMessageBox.styled';

export interface MyMessageBoxProps {
	type: string;
	content: string;
	date: string | null;
	file: Pick<Attachment, 'filename' | 'url'>[];
	state: boolean;
}

const MyMessageBox = (props: MyMessageBoxProps) => {
	const { type, content, date, file, state } = props;

	return (
		<S.MyMessageBoxContainer>
			{date && (
				<Flex direction='column' justify='flex-end'>
					<Text size='sm' weight='medium' color='subtle'>
						{date}
					</Text>
				</Flex>
			)}
			<S.MyMessageBoxWrapper state={state}>
				{/* eslint-disable-next-line no-nested-ternary */}
				{type === 'TEXT' ? (
					<Text size='lg' weight='semiBold' color='iInverse'>
						{content}
					</Text>
				) : type === 'IMAGE' ? (
					<Flex gap='10'>
						{file?.map((img) => (
							<a href={img.url} target='_blank' rel='noopener noreferrer'>
								<img src={img.url} alt={img.filename} />
							</a>
						))}
					</Flex>
				) : (
					<Flex gap='10'>
						{file?.map((files) => (
							<a href={files.url} download>
								{files.filename}
							</a>
						))}
					</Flex>
				)}
			</S.MyMessageBoxWrapper>
		</S.MyMessageBoxContainer>
	);
};

export default MyMessageBox;
