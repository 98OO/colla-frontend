import IconButton from '@components/common/IconButton/IconButton';
import Profile from '@components/common/Profile/Profile';
import { getUnitFormattedSize } from '@utils/getUnitFormattedSize';
import * as S from './Attachments.styled';

interface Attachment {
	id: number;
	name: string;
	fileUrl: string;
	size: number;
}

interface AttachmentsProps {
	attachment: Attachment;
}

const Attachments = ({ attachment }: AttachmentsProps) => {
	const { name, fileUrl, size } = attachment;

	const filterImageURL = (url: string) => {
		const imageRegEx = /\.(jpg|jpeg|png|gif|bmp)$/i;
		return imageRegEx.test(url) ? url : null;
	};

	return (
		<S.AttachmentWrapper>
			<Profile
				profile={filterImageURL(fileUrl)}
				initial={name.charAt(0)}
				avatarSize='mlg'
				avatarShape='rect'
				title={name}
				titleSize='md'
				titleWeight='medium'
				text={getUnitFormattedSize(size)}
			/>
			<IconButton
				ariaLabel='download'
				icon='Download'
				color='primary'
				size='md'
				onClick={() => window.open(fileUrl, '_blank')}
			/>
		</S.AttachmentWrapper>
	);
};

export default Attachments;
