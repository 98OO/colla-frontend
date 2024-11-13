import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import type { Attachment } from '@type/chat';
import ChatAttachments from '../ChatAttachment/ChatAttachments';
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
			<S.MyMessageBoxSpacer />
			<S.TimeWrapper>
				{date && (
					<Text size='sm' weight='regular' color='subtle'>
						{date}
					</Text>
				)}
			</S.TimeWrapper>
			<S.MyMessageBoxWrapper state={state} type={type}>
				{type === 'TEXT' && (
					<Text size='lg' weight='regular' color='iInverse'>
						{content}
					</Text>
				)}
				{type === 'IMAGE' && (
					<S.ImageWrapper>
						{file?.map((img) => (
							<a
								key={img.id}
								href={img.url}
								target='_blank'
								rel='noopener noreferrer'>
								<img src={img.url} alt={img.filename} />
							</a>
						))}
					</S.ImageWrapper>
				)}
				{type === 'FILE' && (
					<Flex gap='10'>
						{file?.map((files) => (
							<ChatAttachments
								key={files.id}
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
