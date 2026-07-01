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

	const updateImageMeta = (event: React.SyntheticEvent<HTMLImageElement>) => {
		const { naturalWidth, naturalHeight } = event.currentTarget;

		if (naturalWidth > naturalHeight) setOrientation('landscape');
		else if (naturalWidth < naturalHeight) setOrientation('portrait');
		else setOrientation('square');

		setIsLoaded(true);
	};

	return (
		<S.ImageLink
			href={src}
			target='_blank'
			rel='noopener noreferrer'
			aria-label={`${alt} 이미지 새 탭에서 보기`}
			onClick={(event) => {
				event.preventDefault();
				openImagePreviewWindow({ src, alt });
			}}
			$isLoaded={isLoaded}
			$orientation={orientation}>
			<S.PreviewImage
				src={src}
				alt={alt}
				loading='lazy'
				onLoad={updateImageMeta}
				$isLoaded={isLoaded}
			/>
		</S.ImageLink>
	);
};

export default ChatImageMessage;
