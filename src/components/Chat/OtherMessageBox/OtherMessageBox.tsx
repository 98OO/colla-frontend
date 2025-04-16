import Avatar from '@components/common/Avatar/Avatar';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import type { Attachment } from '@type/chat';
import ChatAttachments from '../ChatAttachment/ChatAttachments';
import * as S from './OtherMessageBox.styled';

export interface OtherMessageBoxProps {
	name: string;
	profile: string | null;
	type: string;
	content: string;
	date: string | null;
	file: Pick<Attachment, 'filename' | 'url' | 'id' | 'size'>[];
	state: boolean;
}

const OtherMessageBox = (props: OtherMessageBoxProps) => {
	const { name, profile, type, content, date, file, state } = props;

	return (
		<S.OtherMessageBoxContainer state={state}>
			<Flex direction='column' width='32'>
				{state ? (
					<Avatar profile={profile} initial={name} size='md' shape='circle' />
				) : (
					<S.AvatarSpacer />
				)}
			</Flex>
			<Flex direction='column' gap='4'>
				{state && (
					<Text size='md' weight='medium' color='tertiary'>
						{name}
					</Text>
				)}
				<Flex gap='8'>
					<S.OtherMessageBoxWrapper state={state} type={type}>
						{type === 'TEXT' && (
							<Text size='lg' weight='regular' color='secondary'>
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
					</S.OtherMessageBoxWrapper>
					<S.TimeWrapper>
						{date && (
							<Text size='sm' weight='regular' color='subtle'>
								{date}
							</Text>
						)}
					</S.TimeWrapper>
				</Flex>
			</Flex>
			<S.OtherMessageBoxSpacer />
		</S.OtherMessageBoxContainer>
	);
};

export default OtherMessageBox;
