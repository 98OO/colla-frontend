import Avatar from '@components/common/Avatar/Avatar';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import Attachments from '@components/Feed/Attachments/Attachments';
import type { Attachment } from '@type/chat';
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
		<S.OtherMessageBoxContainer>
			<Flex direction='column' width='32'>
				{state && (
					<Avatar profile={profile} initial={name} size='md' shape='circle' />
				)}
			</Flex>
			<Flex direction='column' gap='2'>
				{state && (
					<Text size='md' weight='medium'>
						{name}
					</Text>
				)}
				<S.OtherMessageBoxWrapper state={state} type={type}>
					{/* eslint-disable-next-line no-nested-ternary */}
					{type === 'TEXT' ? (
						<Text size='lg' weight='semiBold' color='secondary'>
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
				</S.OtherMessageBoxWrapper>
			</Flex>
			{/* 날짜 */}
			<Flex direction='column' justify='flex-end'>
				{date && (
					<Text size='sm' weight='medium' color='subtle'>
						{date}
					</Text>
				)}
			</Flex>
		</S.OtherMessageBoxContainer>
	);
};

export default OtherMessageBox;
