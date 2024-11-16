import IconButton from '@components/common/IconButton/IconButton';
import Profile from '@components/common/Profile/Profile';
import { getUnitFormattedSize } from '@utils/getUnitFormattedSize';
import * as S from './ChatAttachments.styled';

interface ChatAttachment {
	id: number;
	name: string;
	fileUrl: string;
	size: number;
}

interface ChatAttachmentProps {
	attachment: ChatAttachment;
}

const ChatAttachment = ({ attachment }: ChatAttachmentProps) => {
	const { name, fileUrl, size } = attachment;

	const filterImageURL = (url: string) => {
		const imageRegEx = /\.(jpg|jpeg|png|gif|bmp)$/i;
		return imageRegEx.test(url) ? url : null;
	};

	return (
		<S.ChatAttachmentWrapper>
			<Profile
				profile={filterImageURL(fileUrl)}
				initial={name.charAt(0)}
				avatarSize='md'
				avatarShape='rect'
				title={name}
				titleSize='md'
				titleWeight='medium'
				text={getUnitFormattedSize(size)}
			/>
			<S.ChatAttachmentsInnerItem>
				<IconButton
					ariaLabel='download'
					icon='Download'
					color='primary'
					size='md'
					onClick={() => window.open(fileUrl, '_blank')}
				/>
			</S.ChatAttachmentsInnerItem>
		</S.ChatAttachmentWrapper>
	);
};

export default ChatAttachment;
