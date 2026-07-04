import { useState } from 'react';
import { openImagePreviewWindow } from '@utils/openImagePreviewWindow';
import * as S from './ChatImageMessage.styled';

type Orientation = 'landscape' | 'portrait' | 'square';

interface ChatImageMessageProps {
	src: string;
	alt: string;
}

const ChatImageMessage = ({ src, alt }: ChatImageMessageProps) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [orientation, setOrientation] = useState<Orientation>('portrait');

	const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
		const { naturalWidth, naturalHeight } = event.currentTarget;

		if (naturalWidth > naturalHeight) setOrientation('landscape');
		else if (naturalWidth < naturalHeight) setOrientation('portrait');
		else setOrientation('square');

		setIsLoaded(true);
	};

	const handleImageClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		if (event.ctrlKey || event.metaKey || event.shiftKey) return;

		event.preventDefault();
		openImagePreviewWindow({ src, alt });
	};

	return (
		<S.ImageLink
			href={src}
			target='_blank'
			rel='noopener noreferrer'
			aria-label={`${alt} 이미지 새 탭에서 보기`}
			onClick={handleImageClick}
			$isLoaded={isLoaded}
			$orientation={orientation}>
			<S.PreviewImage
				src={src}
				alt={alt}
				loading='lazy'
				onLoad={handleImageLoad}
				$isLoaded={isLoaded}
			/>
		</S.ImageLink>
	);
};

export default ChatImageMessage;
