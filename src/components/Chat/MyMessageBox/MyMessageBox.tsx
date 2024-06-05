import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import Attachments from '@components/Feed/Attachments/Attachments';
import type { Attachment } from '@type/chat';
import * as S from './MyMessageBox.styled';

export interface MyMessageBoxProps {
	type: string;
	content: string;
	date: string | null;
	file: Pick<Attachment, 'filename' | 'url' | 'id' | 'size'>[];
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
			<S.MyMessageBoxWrapper state={state} type={type}>
				{/* eslint-disable-next-line no-nested-ternary */}
				{type === 'TEXT' ? (
					<Text size='lg' weight='semiBold' color='iInverse'>
						{content}
					</Text>
				) : type === 'IMAGE' ? (
					<S.ImageWrapper>
						{file?.map((img) => (
							<a href={img.url} target='_blank' rel='noopener noreferrer'>
								<img src={img.url} alt={img.filename} />
							</a>
						))}
					</S.ImageWrapper>
				) : (
					<Flex gap='10'>
						{file?.map((files) => (
							<Attachments
								attachment={{
									id: files.id,
									name: files.filename,
									fileUrl: files.url,
									size: files.size,
								}}
							/>
						))}
					</Flex>
				)}
			</S.MyMessageBoxWrapper>
		</S.MyMessageBoxContainer>
	);
};

export default MyMessageBox;
