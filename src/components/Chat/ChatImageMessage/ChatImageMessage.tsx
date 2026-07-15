import { useState } from 'react';
import { openImagePreviewWindow } from '@utils/openImagePreviewWindow';
import type { Orientation } from '@type/chat';
import * as S from './ChatImageMessage.styled';

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

		const isPreviewOpened = openImagePreviewWindow({ src, alt });

		if (isPreviewOpened) event.preventDefault();
	};

	return (
		<S.ImageLink
			href={src}
			target='_blank'
			rel='noopener noreferrer'
			aria-label={`${alt} 이미지 새 탭에서 보기`}
			onClick={handleImageClick}
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
