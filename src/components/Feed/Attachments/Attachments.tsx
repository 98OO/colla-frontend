import { ReactComponent as DownloadIcon } from '@assets/svg/download.svg';
import IconButton from '@components/common/IconButton/IconButton';
import Profile, { type ProfileProps } from '@components/common/Profile/Profile';
import { getUnitFormattedSize } from '@utils/getUnitFormattedSize';
import { getResponsiveFeedImage } from '@utils/responsiveFeedImage';
import * as S from './Attachments.styled';

type ProfileImageProps = Pick<ProfileProps, 'profile' | 'responsiveImage'>;

const IMAGE_FILE_PATH_PATTERN = /\.(?:avif|bmp|gif|jpe?g|png|webp)$/i;

const isImageFileUrl = (url: string) => {
	try {
		return IMAGE_FILE_PATH_PATTERN.test(new URL(url).pathname);
	} catch {
		return false;
	}
};

const getProfileImageProps = (fileUrl: string): ProfileImageProps => {
	if (!isImageFileUrl(fileUrl)) return { profile: null };

	const responsiveImage = getResponsiveFeedImage(fileUrl, 'thumbnail');
	if (!responsiveImage) return { profile: fileUrl };

	return {
		profile: responsiveImage.src,
		responsiveImage: {
			srcSet: responsiveImage.srcSet,
			sizes: responsiveImage.sizes,
			fallbackSrc: fileUrl,
		},
	};
};

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
	const { profile, responsiveImage } = getProfileImageProps(fileUrl);

	const handleOpenAttachment = () => window.open(fileUrl, '_blank');

	return (
		<S.AttachmentWrapper>
			<Profile
				profile={profile}
				responsiveImage={responsiveImage}
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
				icon={DownloadIcon}
				color='primary'
				size='md'
				onClick={handleOpenAttachment}
			/>
		</S.AttachmentWrapper>
	);
};

export default Attachments;
